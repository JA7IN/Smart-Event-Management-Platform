'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_PARTICIPANTS, 
  INITIAL_TEAMS, 
  INITIAL_JUDGES, 
  INITIAL_SCORES, 
  RUBRIC_CRITERIA 
} from '../data/mockData';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('checkin'); // checkin | team | submissions | leaderboard
  const [activeParticipantId, setActiveParticipantId] = useState('PART-101');
  const [activeJudgeId, setActiveJudgeId] = useState('JUDGE-01');

  // Load from localStorage safely for Next.js SSR
  const [announcements, setAnnouncements] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const [toastNotifications, setToastNotifications] = useState([]);

  useEffect(() => {
    const savedAnn = localStorage.getItem('sem_ann_next');
    setAnnouncements(savedAnn ? JSON.parse(savedAnn) : INITIAL_ANNOUNCEMENTS);

    const savedPart = localStorage.getItem('sem_part_next');
    setParticipants(savedPart ? JSON.parse(savedPart) : INITIAL_PARTICIPANTS);

    const savedTeams = localStorage.getItem('sem_teams_next');
    setTeams(savedTeams ? JSON.parse(savedTeams) : INITIAL_TEAMS);

    const savedScores = localStorage.getItem('sem_scores_next');
    setScores(savedScores ? JSON.parse(savedScores) : INITIAL_SCORES);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (announcements.length > 0) {
      localStorage.setItem('sem_ann_next', JSON.stringify(announcements));
    }
  }, [announcements]);

  useEffect(() => {
    if (participants.length > 0) {
      localStorage.setItem('sem_part_next', JSON.stringify(participants));
    }
  }, [participants]);

  useEffect(() => {
    if (teams.length > 0) {
      localStorage.setItem('sem_teams_next', JSON.stringify(teams));
    }
  }, [teams]);

  useEffect(() => {
    if (scores.length > 0) {
      localStorage.setItem('sem_scores_next', JSON.stringify(scores));
    }
  }, [scores]);

  const addNotification = (title, message, type = 'info') => {
    const id = Date.now();
    const newToast = { id, title, message, type, timestamp: new Date().toLocaleTimeString() };
    setToastNotifications(prev => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setToastNotifications(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setToastNotifications(prev => prev.filter(t => t.id !== id));
  };

  // Actions
  const checkInParticipant = (idOrQr) => {
    let target = participants.find(p => p.id === idOrQr || p.qrCodeValue === idOrQr);
    if (!target) {
      addNotification('Check-in Failed', `Badge "${idOrQr}" not found`, 'error');
      return false;
    }
    if (target.checkInStatus) {
      addNotification('Verified Attendee', `${target.name} is already checked in.`, 'warning');
      return true;
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setParticipants(prev => prev.map(p => p.id === target.id ? { ...p, checkInStatus: true, checkInTime: time } : p));
    addNotification('Access Granted! ⚡', `${target.name} checked in successfully.`, 'success');
    return true;
  };

  const publishAnnouncement = (title, message, category = 'General', priority = 'medium') => {
    const newAnn = {
      id: `ann-${Date.now()}`,
      title,
      message,
      category,
      priority,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    addNotification(`Broadcast: ${title}`, message, priority === 'emergency' ? 'emergency' : 'info');
  };

  const createTeam = (teamName, track, tagline) => {
    const activePart = participants.find(p => p.id === activeParticipantId);
    if (activePart?.teamId) {
      addNotification('Error', 'You already belong to a team.', 'error');
      return;
    }
    const newTeamId = `TEAM-${String(teams.length + 1).padStart(2, '0')}`;
    const newTeam = {
      id: newTeamId,
      name: teamName,
      track,
      tagline,
      repoUrl: '',
      demoUrl: '',
      members: [activeParticipantId],
      submissionStatus: 'Draft',
      submissionTime: null
    };
    setTeams(prev => [...prev, newTeam]);
    setParticipants(prev => prev.map(p => p.id === activeParticipantId ? { ...p, teamId: newTeamId, lookingForTeam: false } : p));
    addNotification('Team Formed!', `"${teamName}" successfully created.`, 'success');
  };

  const joinTeam = (teamId) => {
    const activePart = participants.find(p => p.id === activeParticipantId);
    if (activePart?.teamId) {
      addNotification('Error', 'Leave your current team first.', 'error');
      return;
    }
    const targetTeam = teams.find(t => t.id === teamId);
    if (!targetTeam) return;

    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, members: [...t.members, activeParticipantId] } : t));
    setParticipants(prev => prev.map(p => p.id === activeParticipantId ? { ...p, teamId, lookingForTeam: false } : p));
    addNotification('Success', `Joined team "${targetTeam.name}"`, 'success');
  };

  const toggleLookingForTeam = () => {
    setParticipants(prev => prev.map(p => p.id === activeParticipantId ? { ...p, lookingForTeam: !p.lookingForTeam } : p));
  };

  const submitProject = (teamId, repoUrl, demoUrl) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, repoUrl, demoUrl, submissionStatus: 'Submitted', submissionTime: time } : t));
    addNotification('Submitted! 🚀', 'Project payload dispatched to judging rubrics.', 'success');
  };

  const submitRubricScore = (judgeId, teamId, rubricScores, feedback) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setScores(prev => {
      const idx = prev.findIndex(s => s.judgeId === judgeId && s.teamId === teamId);
      const newScore = { judgeId, teamId, rubricScores, feedback, submittedAt: time };
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newScore;
        return copy;
      }
      return [...prev, newScore];
    });
    addNotification('Evaluation Logged', 'Leaderboard standings computed.', 'success');
  };

  // Computations
  const leaderboardStandings = teams.map(team => {
    const teamScores = scores.filter(s => s.teamId === team.id);
    if (teamScores.length === 0) {
      return {
        ...team,
        averageScore: 0,
        judgeCount: 0,
        breakdown: { innovation: 0, execution: 0, design: 0, pitch: 0 }
      };
    }
    let totalSum = 0;
    const totals = { innovation: 0, execution: 0, design: 0, pitch: 0 };
    teamScores.forEach(s => {
      const r = s.rubricScores;
      totals.innovation += r.innovation || 0;
      totals.execution += r.execution || 0;
      totals.design += r.design || 0;
      totals.pitch += r.pitch || 0;
      totalSum += (r.innovation * 0.25) + (r.execution * 0.25) + (r.design * 0.25) + (r.pitch * 0.25);
    });
    return {
      ...team,
      averageScore: parseFloat((totalSum / teamScores.length).toFixed(2)),
      judgeCount: teamScores.length,
      breakdown: {
        innovation: (totals.innovation / teamScores.length).toFixed(1),
        execution: (totals.execution / teamScores.length).toFixed(1),
        design: (totals.design / teamScores.length).toFixed(1),
        pitch: (totals.pitch / teamScores.length).toFixed(1)
      }
    };
  }).sort((a, b) => b.averageScore - a.averageScore);

  const activeParticipant = participants.find(p => p.id === activeParticipantId) || participants[0];
  const activeParticipantTeam = teams.find(t => t.id === activeParticipant?.teamId);

  const stats = {
    totalRegistered: participants.length,
    totalCheckedIn: participants.filter(p => p.checkInStatus).length,
    totalTeams: teams.length,
    submittedProjects: teams.filter(t => t.submissionStatus === 'Submitted').length,
    totalEvaluations: scores.length
  };

  return (
    <EventContext.Provider value={{
      currentView,
      setCurrentView,
      activeParticipantId,
      setActiveParticipantId,
      activeParticipant,
      activeParticipantTeam,
      activeJudgeId,
      setActiveJudgeId,
      announcements,
      participants,
      teams,
      judges: INITIAL_JUDGES,
      scores,
      stats,
      leaderboardStandings,
      toastNotifications,
      addNotification,
      removeNotification,
      checkInParticipant,
      publishAnnouncement,
      createTeam,
      joinTeam,
      toggleLookingForTeam,
      submitProject,
      submitRubricScore
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    // Return safe initial fallbacks for Next SSR hydration phase
    return {
      currentView: 'checkin',
      setCurrentView: () => {},
      activeParticipantId: 'PART-101',
      setActiveParticipantId: () => {},
      activeParticipant: { name: 'Alex Rivera', role: 'Full-Stack Developer', skills: [], bio: '', checkInStatus: false, qrCodeValue: '' },
      activeParticipantTeam: null,
      activeJudgeId: 'JUDGE-01',
      setActiveJudgeId: () => {},
      announcements: [],
      participants: [],
      teams: [],
      judges: [],
      scores: [],
      stats: { totalRegistered: 0, totalCheckedIn: 0, totalTeams: 0, submittedProjects: 0, totalEvaluations: 0 },
      leaderboardStandings: [],
      toastNotifications: [],
      addNotification: () => {},
      removeNotification: () => {},
      checkInParticipant: () => {},
      publishAnnouncement: () => {},
      createTeam: () => {},
      joinTeam: () => {},
      toggleLookingForTeam: () => {},
      submitProject: () => {},
      submitRubricScore: () => {}
    };
  }
  return context;
};
