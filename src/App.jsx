'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  User, 
  ShieldCheck, 
  QrCode, 
  Users, 
  Send, 
  Trophy, 
  Megaphone, 
  CheckCircle2, 
  Clock, 
  Search, 
  Sliders, 
  ArrowRight, 
  AlertTriangle,
  Github,
  Globe,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

const RUBRIC_CRITERIA = [
  { id: 'innovation', name: 'Innovation' },
  { id: 'execution', name: 'Execution' },
  { id: 'design', name: 'Design & UI/UX' },
  { id: 'pitch', name: 'Pitch & Presentation' }
];

export default function SmartEventDashboard() {
  const [role, setRole] = useState('organizer'); // participant | judge | organizer
  const [currentTab, setCurrentTab] = useState('checkin'); // checkin | team | submissions | leaderboard | broadcasts

  // Operational state variables (synced to localStorage)
  const [participants, setParticipants] = useState([
    { id: 'PART-101', name: 'Alex Rivera', role: 'Frontend Engineer', skills: ['React', 'TypeScript', 'Tailwind'], checkInStatus: true, checkInTime: '09:15 AM', lookingForTeam: false, qrValue: 'QR-ALEX-101', teamId: 'TEAM-01' },
    { id: 'PART-102', name: 'Sophia Chen', role: 'AI Developer', skills: ['Python', 'PyTorch', 'FastAPI'], checkInStatus: true, checkInTime: '09:30 AM', lookingForTeam: false, qrValue: 'QR-SOPHIA-102', teamId: 'TEAM-01' },
    { id: 'PART-103', name: 'Marcus Vance', role: 'UI/UX Designer', skills: ['Figma', 'CSS', 'UI Animation'], checkInStatus: false, checkInTime: null, lookingForTeam: true, qrValue: 'QR-MARCUS-103', teamId: null },
    { id: 'PART-104', name: 'Elena Rostova', role: 'Backend Dev', skills: ['Go', 'Docker', 'Kubernetes'], checkInStatus: true, checkInTime: '10:05 AM', lookingForTeam: false, qrValue: 'QR-ELENA-104', teamId: 'TEAM-02' },
    { id: 'PART-105', name: 'David Kim', role: 'DevOps Lead', skills: ['AWS', 'Terraform', 'CI/CD'], checkInStatus: false, checkInTime: null, lookingForTeam: true, qrValue: 'QR-DAVID-105', teamId: null }
  ]);

  const [teams, setTeams] = useState([
    { id: 'TEAM-01', name: 'NeuralPulse AI', track: 'AI / ML', tagline: 'Real-time agentic voice parsing pipeline.', repoUrl: 'github.com/neuralpulse/mesh', demoUrl: 'youtube.com/watch?v=np-demo', members: ['PART-101', 'PART-102'], submissionStatus: 'Submitted' },
    { id: 'TEAM-02', name: 'CyberShield', track: 'Open Innovation', tagline: 'Decentralized identity badge credentials.', repoUrl: '', demoUrl: '', members: ['PART-104'], submissionStatus: 'Draft' }
  ]);

  const [broadcasts, setBroadcasts] = useState([
    { id: 1, category: 'Schedule', time: '14:30 IST', title: 'Submission Portal Live', text: 'Deliverable forms are open in the Submissions tab.' },
    { id: 2, category: 'Venue', time: '15:00 IST', title: 'Lunch Tokens Checked', text: 'Food court is open for checked-in attendees.' }
  ]);

  const [scores, setScores] = useState([
    { teamId: 'TEAM-01', judgeId: 'JUDGE-01', rubrics: { innovation: 9, execution: 8.5, design: 9.5, pitch: 9 }, feedback: 'Outstanding client experience & fluid animations.' }
  ]);

  // View Personas state
  const [activePartId, setActivePartId] = useState('PART-101');
  const [activeJudgeId, setActiveJudgeId] = useState('JUDGE-01');

  // Interactive Form Inputs
  const [repoInput, setRepoInput] = useState('');
  const [demoInput, setDemoInput] = useState('');
  const [teamNameInput, setTeamNameInput] = useState('');
  const [teamTrackInput, setTeamTrackInput] = useState('AI / ML');
  const [teamTaglineInput, setTeamTaglineInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('ALL');

  // Validator terminal console state
  const [repoCheckUrl, setRepoCheckUrl] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [terminalLoading, setTerminalLoading] = useState(false);
  const [terminalResult, setTerminalResult] = useState(null);

  // Judging panel inputs
  const [judgeSelectedTeam, setJudgeSelectedTeam] = useState('TEAM-01');
  const [judgeRubrics, setJudgeRubrics] = useState({ innovation: 5, execution: 5, design: 5, pitch: 5 });
  const [judgeFeedback, setJudgeFeedback] = useState('');

  // Organizer Broadcast input
  const [orgTitle, setOrgTitle] = useState('');
  const [orgText, setOrgText] = useState('');
  const [orgCategory, setOrgCategory] = useState('General');

  // Scanner Simulator Input
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);

  // Leaderboard expanded team
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  // Load state from local storage safely
  useEffect(() => {
    const savedPart = localStorage.getItem('pe_part');
    if (savedPart) setParticipants(JSON.parse(savedPart));

    const savedTeams = localStorage.getItem('pe_teams');
    if (savedTeams) setTeams(JSON.parse(savedTeams));

    const savedBroad = localStorage.getItem('pe_broad');
    if (savedBroad) setBroadcasts(JSON.parse(savedBroad));

    const savedScores = localStorage.getItem('pe_scores');
    if (savedScores) setScores(JSON.parse(savedScores));
  }, []);

  const triggerSave = (newPart, newTeams, newBroad, newScores) => {
    localStorage.setItem('pe_part', JSON.stringify(newPart));
    localStorage.setItem('pe_teams', JSON.stringify(newTeams));
    localStorage.setItem('pe_broad', JSON.stringify(newBroad));
    localStorage.setItem('pe_scores', JSON.stringify(newScores));
  };

  // --- ACTIONS ---

  // 1. QR Scan Admissions
  const handleCheckin = (idOrQr) => {
    const target = participants.find(p => p.id === idOrQr || p.qrValue === idOrQr);
    if (!target) {
      setScanResult({ success: false, msg: `Token "${idOrQr}" not found in registry.` });
      return;
    }
    if (target.checkInStatus) {
      setScanResult({ success: true, msg: `${target.name} is already verified.` });
      return;
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated = participants.map(p => p.id === target.id ? { ...p, checkInStatus: true, checkInTime: time } : p);
    setParticipants(updated);
    setScanResult({ success: true, msg: `Verified access granted to ${target.name}!` });
    triggerSave(updated, teams, broadcasts, scores);
  };

  // 2. Assemble New Squad
  const handleAssembleSquad = (e) => {
    e.preventDefault();
    if (!teamNameInput.trim()) return;

    const newTeamId = `TEAM-${String(teams.length + 1).padStart(2, '0')}`;
    const newTeam = {
      id: newTeamId,
      name: teamNameInput.trim(),
      track: teamTrackInput,
      tagline: teamTaglineInput.trim() || 'No tagline set.',
      repoUrl: '',
      demoUrl: '',
      members: [activePartId],
      submissionStatus: 'Draft'
    };

    const updatedTeams = [...teams, newTeam];
    const updatedPart = participants.map(p => p.id === activePartId ? { ...p, teamId: newTeamId, lookingForTeam: false } : p);
    setTeams(updatedTeams);
    setParticipants(updatedPart);
    setTeamNameInput('');
    setTeamTaglineInput('');
    triggerSave(updatedPart, updatedTeams, broadcasts, scores);
  };

  // 3. Deliverables Submit
  const handleDeliverablesSubmit = (e) => {
    e.preventDefault();
    const activePart = participants.find(p => p.id === activePartId);
    if (!activePart?.teamId) return;

    const updatedTeams = teams.map(t => t.id === activePart.teamId ? { ...t, repoUrl: repoInput, demoUrl: demoInput, submissionStatus: 'Submitted' } : t);
    setTeams(updatedTeams);
    setRepoInput('');
    setDemoInput('');
    triggerSave(participants, updatedTeams, broadcasts, scores);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  // 4. Git single-branch checker simulator
  const handleGitValidatorCheck = (e) => {
    e.preventDefault();
    if (!repoCheckUrl.trim()) return;

    setTerminalLoading(true);
    setTerminalLogs([]);
    setTerminalResult(null);

    const checkPipeline = [
      '⚡ Resolving github.com target payload...',
      '⚡ Querying branch list API: git ls-remote --heads...',
      '⚡ Checking node_modules footprint mapping...',
      '⚡ Estimating build size coefficients...',
      '⚡ Compliance audit finished.'
    ];

    checkPipeline.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, log]);
        if (index === checkPipeline.length - 1) {
          setTerminalLoading(false);
          setTerminalResult({
            isValid: true,
            branches: 1,
            sizeFriendly: '231.8 KB',
            msg: 'Repository verification cleared! Strictly 1 branch found.'
          });
        }
      }, (index + 1) * 500);
    });
  };

  // 5. Judge rubric score submission
  const handleJudgeSubmission = (e) => {
    e.preventDefault();
    const newScore = {
      teamId: judgeSelectedTeam,
      judgeId: activeJudgeId,
      rubrics: { ...judgeRubrics },
      feedback: judgeFeedback.trim()
    };

    const index = scores.findIndex(s => s.teamId === judgeSelectedTeam && s.judgeId === activeJudgeId);
    let updatedScores = [...scores];
    if (index >= 0) {
      updatedScores[index] = newScore;
    } else {
      updatedScores.push(newScore);
    }
    setScores(updatedScores);
    setJudgeFeedback('');
    triggerSave(participants, teams, broadcasts, updatedScores);
    confetti({ particleCount: 80, spread: 70, colors: ['#6366F1', '#10B981'], origin: { y: 0.8 } });
  };

  // 6. Organizer announcement broadcast
  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!orgTitle.trim() || !orgText.trim()) return;

    const newBroad = [
      {
        id: broadcasts.length + 1,
        category: orgCategory,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: orgTitle.trim(),
        text: orgText.trim()
      },
      ...broadcasts
    ];
    setBroadcasts(newBroad);
    setOrgTitle('');
    setOrgText('');
    triggerSave(participants, teams, newBroad, scores);
  };

  // --- DERIVED DATA ---
  const activeParticipant = participants.find(p => p.id === activePartId) || participants[0];
  const activePartTeam = teams.find(t => t.id === activeParticipant?.teamId);

  // Dynamic score calculator
  const leaderboardStandings = teams.map(team => {
    const teamScores = scores.filter(s => s.teamId === team.id);
    if (teamScores.length === 0) {
      return { ...team, average: 0, count: 0, breakdown: { innovation: 0, execution: 0, design: 0, pitch: 0 } };
    }

    let sum = 0;
    const sums = { innovation: 0, execution: 0, design: 0, pitch: 0 };
    teamScores.forEach(s => {
      const r = s.rubrics;
      sums.innovation += r.innovation;
      sums.execution += r.execution;
      sums.design += r.design;
      sums.pitch += r.pitch;
      sum += (r.innovation * 0.25) + (r.execution * 0.25) + (r.design * 0.25) + (r.pitch * 0.25);
    });

    const divisor = teamScores.length;
    return {
      ...team,
      average: parseFloat((sum / divisor).toFixed(2)),
      count: divisor,
      breakdown: {
        innovation: (sums.innovation / divisor).toFixed(1),
        execution: (sums.execution / divisor).toFixed(1),
        design: (sums.design / divisor).toFixed(1),
        pitch: (sums.pitch / divisor).toFixed(1)
      }
    };
  }).sort((a, b) => b.average - a.average);

  // Live Metrics Stats
  const totalRegistered = participants.length;
  const totalCheckedin = participants.filter(p => p.checkInStatus).length;
  const submissionsCount = teams.filter(t => t.submissionStatus === 'Submitted').length;
  const totalEvaluationCount = scores.length;
  const uncheckedList = participants.filter(p => !p.checkInStatus);

  const calculatedWeightedScore = parseFloat(
    (
      ((judgeRubrics.innovation || 0) +
       (judgeRubrics.execution || 0) +
       (judgeRubrics.design || 0) +
       (judgeRubrics.pitch || 0)) / 4
    ).toFixed(2)
  );

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 font-sans p-4 md:p-6 select-none">
      
      {/* Top Bar: Logo | Event Name & Persona Control Dropdown */}
      <header className="max-w-7xl mx-auto bg-[#121824] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl mb-6">
        
        {/* Logo and Live Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6366F1] via-[#7000FF] to-[#00F2FE] flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-heading">EventPulse Hub</span>
              <span className="bg-[#6366F1]/10 text-[#818cf8] border border-[#6366F1]/30 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Active Monitor
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">Smart Event Management Platform</p>
          </div>
        </div>

        {/* Persona Switchers */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* View Persona selection */}
          <div className="flex bg-[#0B0F17] border border-white/5 p-1 rounded-xl text-xs">
            {['participant', 'judge', 'organizer'].map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  // Auto redirect tab if necessary
                  if (r === 'judge') setCurrentTab('submissions');
                  else if (r === 'organizer') setCurrentTab('checkin');
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold uppercase text-[10px] tracking-wider transition-all ${
                  role === r
                    ? 'bg-[#6366F1] text-white shadow'
                    : 'text-gray-400 hover:text-[#818cf8]'
                }`}
              >
                {r} View
              </button>
            ))}
          </div>

          {/* Persona selector select dropdown */}
          {role === 'participant' ? (
            <div className="flex items-center gap-1.5 bg-[#0B0F17] border border-white/5 rounded-xl px-2.5 py-1.5 text-[11px]">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={activePartId}
                onChange={(e) => {
                  setActivePartId(e.target.value);
                  const p = participants.find(part => part.id === e.target.value);
                  if (p?.teamId) {
                    const t = teams.find(team => team.id === p.teamId);
                    setRepoInput(t?.repoUrl || '');
                    setDemoInput(t?.demoUrl || '');
                  } else {
                    setRepoInput('');
                    setDemoInput('');
                  }
                }}
                className="bg-transparent border-none outline-none font-semibold text-gray-200 cursor-pointer"
              >
                {participants.map(p => (
                  <option key={p.id} value={p.id} className="bg-[#0b0f17] text-white">
                    {p.name} ({p.id})
                  </option>
                ))}
              </select>
            </div>
          ) : role === 'judge' ? (
            <div className="flex items-center gap-1.5 bg-[#0B0F17] border border-white/5 rounded-xl px-2.5 py-1.5 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <select
                value={activeJudgeId}
                onChange={(e) => setActiveJudgeId(e.target.value)}
                className="bg-transparent border-none outline-none font-semibold text-gray-200 cursor-pointer"
              >
                <option value="JUDGE-01" className="bg-[#0b0f17]">Judge: Dr. Thorne</option>
                <option value="JUDGE-02" className="bg-[#0b0f17]">Judge: Maya Lin</option>
              </select>
            </div>
          ) : null}

        </div>

      </header>

      {/* Tabbed Navigation Bar */}
      <div className="max-w-7xl mx-auto flex overflow-x-auto gap-2 mb-6 pb-1 no-scrollbar text-xs">
        {[
          { id: 'checkin', label: 'Check-in Desk / QR', icon: QrCode },
          { id: 'team', label: 'Team Finder', icon: Users },
          { id: 'submissions', label: 'Submissions & Sliders', icon: Send },
          { id: 'leaderboard', label: 'Live Standings', icon: Trophy },
          { id: 'broadcasts', label: 'Announcements Feed', icon: Megaphone }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold border transition-all ${
                isActive 
                  ? 'bg-[#6366F1]/10 text-[#818cf8] border-[#6366F1]/30 shadow-md shadow-[#6366F1]/5' 
                  : 'text-gray-400 hover:text-white border-transparent hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT WING: Core Action Panels */}
        <div className="lg:col-span-2 space-y-6">

          {/* TAB 1: Check-in Desk / QR */}
          {currentTab === 'checkin' && (
            <div className="space-y-6">
              
              {/* QR Pass Card (Participant View) */}
              <div className="bg-[#121824] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366F1]/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Cyber-Pass QR Code</h3>
                  {activeParticipant.checkInStatus ? (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Clearance Granted
                    </span>
                  ) : (
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                      Pending Admissions
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="bg-white p-3 rounded-xl border border-[#6366F1]/30 shadow-md">
                    <QRCodeSVG 
                      value={activeParticipant.qrValue} 
                      size={120} 
                      level="H"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <h4 className="text-sm font-bold text-white leading-tight">{activeParticipant.name}</h4>
                    <p className="text-[11px] text-[#818cf8] font-medium">{activeParticipant.role}</p>
                    <p className="text-[10px] text-gray-500">ID token: <strong className="font-mono text-gray-300">{activeParticipant.id}</strong></p>
                    <p className="text-[10px] text-gray-400">Team: <strong className="text-white">{activePartTeam ? activePartTeam.name : 'Solo Hacker'}</strong></p>
                  </div>
                </div>
              </div>

              {/* QR scanner Simulator (Organizer View) */}
              {role === 'organizer' && (
                <div className="bg-[#121824] border border-white/5 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Admissions Verification Station</h3>
                  
                  <div className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 space-y-3">
                    <div className="w-full h-24 border-2 border-dashed border-emerald-500/30 rounded-lg flex flex-col items-center justify-center p-3 text-center">
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest animate-pulse">Simulator Active</span>
                      <p className="text-[10px] text-gray-500 mt-1">Select a pending hacker below to simulate QR pass scan</p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleCheckin(scanInput); setScanInput(''); }} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Paste badge QR value or Participant ID..."
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value)}
                        className="flex-grow bg-[#05070f] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-emerald-500 transition-all font-mono"
                      />
                      <button type="submit" className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-gray-950 font-bold hover:bg-emerald-400 text-xs">
                        Verify
                      </button>
                    </form>
                  </div>

                  {scanResult && (
                    <div className={`p-3 rounded-lg text-[10px] font-semibold flex justify-between items-center ${
                      scanResult.success 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      <span>{scanResult.msg}</span>
                    </div>
                  )}

                  {/* Pending Checkins list */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Pending Admissions Check-ins ({uncheckedList.length})</span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {uncheckedList.map(p => (
                        <div
                          key={p.id}
                          onClick={() => handleCheckin(p.id)}
                          className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-white/5 hover:border-emerald-500/30 cursor-pointer text-[10px] transition-colors"
                        >
                          <div>
                            <span className="text-gray-200 font-semibold">{p.name}</span>
                            <span className="text-gray-500 block text-[9px]">{p.role}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-slate-800 text-gray-400 border border-white/5 rounded text-[8px] uppercase tracking-wider font-mono">
                            Tap to Scan
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: Team Finder Matchmaker */}
          {currentTab === 'team' && (
            <div className="space-y-6">
              
              {/* Filter panel */}
              <div className="bg-[#121824] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs">
                <div className="relative w-full sm:w-60">
                  <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name, stack, role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-white/5 rounded-xl py-2 pl-8 pr-3 text-xs text-white outline-none focus:border-[#6366F1]"
                  />
                </div>

                <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                  {['ALL', 'React', 'Python', 'Go', 'Figma'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSkillsFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold border transition-all ${
                        skillsFilter === s 
                          ? 'bg-[#6366F1]/20 text-[#818cf8] border-[#6366F1]/30 shadow' 
                          : 'bg-[#0B0F17] text-gray-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matchmaker list grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {participants
                  .filter(p => {
                    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.role.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesSkill = skillsFilter === 'ALL' || p.skills.includes(skillsFilter);
                    return matchesSearch && matchesSkill;
                  })
                  .map(part => {
                    const partTeam = teams.find(t => t.id === part.teamId);
                    return (
                      <div key={part.id} className="bg-[#121824] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-40">
                        <div>
                          <div className="flex justify-between items-start gap-3">
                            <div>
                              <h4 className="text-xs font-bold text-white">{part.name}</h4>
                              <p className="text-[10px] text-[#818cf8] font-medium">{part.role}</p>
                            </div>
                            {part.lookingForTeam ? (
                              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                                Hiring Solo
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-slate-800 text-gray-400 border border-white/5 truncate max-w-[80px]">
                                {partTeam ? partTeam.name : 'In Team'}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {part.skills.map(s => (
                              <span key={s} className="bg-[#0B0F17] border border-white/5 text-[9px] px-2 py-0.5 rounded font-mono">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] text-gray-500">
                          <span>Node token: <strong className="font-mono text-gray-400">{part.id}</strong></span>
                          {part.id === activeParticipant.id && (
                            <span className="text-[#818cf8] font-bold uppercase tracking-wider">You</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Assemble team panel (Participant view without team) */}
              {!activePartTeam && (
                <div className="bg-[#121824] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-1">Assemble Hack Squad</h3>
                  <p className="text-gray-400 mb-4">Complete fields below to create a new team project card.</p>
                  
                  <form onSubmit={handleAssembleSquad} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Team Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Brainiacs AI"
                          value={teamNameInput}
                          onChange={(e) => setTeamNameInput(e.target.value)}
                          className="w-full bg-[#0B0F17] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-[#6366F1]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Track Track</label>
                        <select
                          value={teamTrackInput}
                          onChange={(e) => setTeamTrackInput(e.target.value)}
                          className="w-full bg-[#0B0F17] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-[#6366F1] cursor-pointer"
                        >
                          <option value="AI / ML">AI / ML Track</option>
                          <option value="Open Innovation">Open Innovation</option>
                          <option value="Sustainability">Sustainability</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Tagline</label>
                      <input
                        type="text"
                        placeholder="e.g. Building carbon credits parsing maps"
                        value={teamTaglineInput}
                        onChange={(e) => setTeamTaglineInput(e.target.value)}
                        className="w-full bg-[#0B0F17] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-[#6366F1]"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">
                      Form Team Profile
                    </button>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: Submissions & Sliders */}
          {currentTab === 'submissions' && (
            <div className="space-y-6">
              
              {/* Participant view - Deliverables form & single-branch validator */}
              {role === 'participant' && (
                <>
                  <div className="bg-[#121824] border border-white/5 rounded-2xl p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-emerald-400" /> Deliverables submission console
                    </h3>

                    {activePartTeam ? (
                      <form onSubmit={handleDeliverablesSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">GitHub URL</label>
                            <input
                              type="url"
                              placeholder="https://github.com/user/project"
                              value={repoInput}
                              onChange={(e) => setRepoInput(e.target.value)}
                              className="w-full bg-[#0B0F17] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-[#6366F1] font-mono"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Video Demo Link</label>
                            <input
                              type="url"
                              placeholder="https://youtube.com/watch?v=pitch"
                              value={demoInput}
                              onChange={(e) => setDemoInput(e.target.value)}
                              className="w-full bg-[#0B0F17] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-[#6366F1] font-mono"
                              required
                            />
                          </div>
                        </div>

                        <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-500 text-gray-950 font-bold text-xs hover:bg-emerald-400 transition-all">
                          Lock Deliverables & Submit Project
                        </button>
                      </form>
                    ) : (
                      <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 p-4 rounded-xl">
                        ⚠️ Assemble or join a team first in the Team Finder tab.
                      </div>
                    )}
                  </div>

                  {/* Single branch Validator */}
                  <div className="bg-[#121824] border border-white/5 rounded-2xl p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400" /> Single-Branch &amp; Payload Validator
                    </h3>
                    <p className="text-gray-400">
                      Test repository branch metadata directly before final commit.
                    </p>

                    <form onSubmit={handleGitValidatorCheck} className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://github.com/user/project"
                        value={repoCheckUrl}
                        onChange={(e) => setRepoCheckUrl(e.target.value)}
                        className="flex-grow bg-[#0B0F17] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-[#6366F1] font-mono"
                        required
                      />
                      <button type="submit" disabled={terminalLoading} className="px-4 py-2 rounded-xl bg-[#6366F1] hover:bg-[#6366F1]/90 text-white font-bold text-xs shrink-0 transition-all">
                        {terminalLoading ? 'Running...' : 'Run Test'}
                      </button>
                    </form>

                    {terminalLogs.length > 0 && (
                      <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5 font-mono text-[9px] text-gray-400 space-y-1">
                        {terminalLogs.map((log, idx) => (
                          <div key={idx} className={idx === terminalLogs.length - 1 ? 'text-indigo-400' : ''}>
                            {log}
                          </div>
                        ))}
                      </div>
                    )}

                    {terminalResult && (
                      <div className="bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-xl text-[10px] text-gray-300">
                        <strong className="text-emerald-400 block mb-1">✓ Compliance Check Success</strong>
                        Branches: {terminalResult.branches} | Size: {terminalResult.sizeFriendly} | status: {terminalResult.msg}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Judge view - Rubric sliders & assigned checklist */}
              {role === 'judge' && (
                <div className="bg-[#121824] border border-white/5 rounded-2xl p-6 space-y-6">
                  
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <div>
                      <span className="text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded uppercase font-bold">
                        Scoring Workspace
                      </span>
                      <h3 className="text-sm font-extrabold text-white mt-1 font-heading">
                        Holographic Judging Portal
                      </h3>
                    </div>
                    <div className="bg-[#0B0F17] border border-white/5 rounded-xl px-2.5 py-1 text-[10px]">
                      Target: <select 
                        value={judgeSelectedTeam} 
                        onChange={(e) => {
                          setJudgeSelectedTeam(e.target.value);
                          const existing = scores.find(s => s.teamId === e.target.value && s.judgeId === activeJudgeId);
                          if (existing) {
                            setJudgeRubrics(existing.rubrics);
                            setJudgeFeedback(existing.feedback || '');
                          } else {
                            setJudgeRubrics({ innovation: 5, execution: 5, design: 5, pitch: 5 });
                            setJudgeFeedback('');
                          }
                        }}
                        className="bg-transparent border-none outline-none font-bold text-[#818cf8] cursor-pointer"
                      >
                        {teams.map(t => (
                          <option key={t.id} value={t.id} className="bg-[#0b0f17]">{t.name} ({t.id})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sliders Form */}
                  <form onSubmit={handleJudgeSubmission} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {RUBRIC_CRITERIA.map(crit => {
                        const scoreVal = judgeRubrics[crit.id] || 0;
                        return (
                          <div key={crit.id} className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 space-y-2">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="font-bold text-gray-200">{crit.name}</span>
                              <span className="font-mono font-bold text-indigo-400">{scoreVal} / 10</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="10"
                              step="1"
                              value={scoreVal}
                              onChange={(e) => setJudgeRubrics({ ...judgeRubrics, [crit.id]: parseInt(e.target.value) })}
                              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-950 rounded"
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Live preview weighted calculation */}
                    <div className="bg-[#6366F1]/10 border border-[#6366F1]/30 p-3.5 rounded-xl flex justify-between items-center text-[11px]">
                      <span className="text-indigo-300 font-semibold">Live Score Aggregate (Equal 25% weight):</span>
                      <strong className="text-emerald-400 font-mono text-base">{calculatedWeightedScore} / 10.0</strong>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Qualitative Feedback</label>
                      <textarea
                        placeholder="Type construct remarks for final telemetry report..."
                        value={judgeFeedback}
                        onChange={(e) => setJudgeFeedback(e.target.value)}
                        className="w-full bg-[#0B0F17] border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-[#6366F1]"
                        rows={3}
                      />
                    </div>

                    <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold text-xs hover:opacity-90">
                      Commit Rubric Scores
                    </button>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: Live Leaderboard standings */}
          {currentTab === 'leaderboard' && (
            <div className="space-y-6">
              
              {/* Podium */}
              {leaderboardStandings.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-end">
                  
                  {/* Silver */}
                  <div className="bg-[#121824] border border-white/5 p-5 rounded-2xl text-center border-t-4 border-t-gray-400 mt-4">
                    <span className="text-xl block">🥈</span>
                    <span className="text-[8px] bg-slate-800 border border-white/5 px-2 py-0.5 rounded text-gray-400 block w-fit mx-auto mb-1">
                      {leaderboardStandings[1].track}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1.5">{leaderboardStandings[1].name}</h4>
                    <p className="text-[10px] font-mono font-bold text-cyan-400 mt-2">
                      {leaderboardStandings[1].average.toFixed(2)} pts
                    </p>
                  </div>

                  {/* Gold */}
                  <div className="bg-[#121824] border border-[#6366F1]/30 p-6 rounded-2xl text-center border-t-4 border-t-amber-400 bg-gradient-to-b from-[#6366F1]/5 to-slate-900/40 shadow-2xl">
                    <span className="text-2xl block">👑</span>
                    <span className="text-[8px] bg-[#6366F1]/10 border border-[#6366F1]/30 px-2 py-0.5 rounded text-[#818cf8] block w-fit mx-auto mb-1">
                      {leaderboardStandings[0].track}
                    </span>
                    <h4 className="text-sm font-extrabold text-white mt-1.5 leading-tight">{leaderboardStandings[0].name}</h4>
                    <p className="text-xl font-mono font-bold text-amber-400 mt-2.5">
                      {leaderboardStandings[0].average.toFixed(2)} pts
                    </p>
                  </div>

                  {/* Bronze */}
                  <div className="bg-[#121824] border border-white/5 p-5 rounded-2xl text-center border-t-4 border-t-amber-800 mt-4">
                    <span className="text-xl block">🥉</span>
                    <span className="text-[8px] bg-slate-800 border border-white/5 px-2 py-0.5 rounded text-gray-400 block w-fit mx-auto mb-1">
                      {leaderboardStandings[2].track}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1.5">{leaderboardStandings[2].name}</h4>
                    <p className="text-[10px] font-mono font-bold text-amber-500 mt-2">
                      {leaderboardStandings[2].average.toFixed(2)} pts
                    </p>
                  </div>

                </div>
              )}

              {/* Ranks list */}
              <div className="bg-[#121824] border border-white/5 rounded-2xl p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-400 uppercase tracking-wider text-[9px]">
                        <th className="py-3 px-3 text-center">Rank</th>
                        <th className="py-3 px-3">Team Project</th>
                        <th className="py-3 px-3">Track</th>
                        <th className="py-3 px-3 text-center">Graded By</th>
                        <th className="py-3 px-3 text-center">Score</th>
                        <th className="py-3 px-3 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leaderboardStandings.map((team, idx) => {
                        const rank = idx + 1;
                        const isExpanded = expandedTeamId === team.id;
                        const tScores = scores.filter(s => s.teamId === team.id);

                        return (
                          <React.Fragment key={team.id}>
                            <tr className="hover:bg-white/5 transition-colors">
                              <td className="py-4 px-3 text-center">
                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold font-mono text-[10px] ${
                                  rank === 1 ? 'bg-amber-400 text-gray-950' : rank === 2 ? 'bg-gray-300 text-gray-950' : rank === 3 ? 'bg-amber-800 text-white' : 'bg-[#0B0F17] text-gray-400'
                                }`}>
                                  #{rank}
                                </span>
                              </td>
                              <td className="py-4 px-3">
                                <div className="font-bold text-white text-xs">{team.name}</div>
                                <div className="text-[9px] text-gray-400 italic mt-0.5">"{team.tagline}"</div>
                              </td>
                              <td className="py-4 px-3">
                                <span className="bg-[#6366F1]/10 text-[#818cf8] border border-[#6366F1]/20 text-[9px] font-bold px-2 py-0.5 rounded">
                                  {team.track}
                                </span>
                              </td>
                              <td className="py-4 px-3 text-center font-semibold text-gray-300">
                                {team.count} Evaluator{team.count !== 1 ? 's' : ''}
                              </td>
                              <td className="py-4 px-3 text-center">
                                <span className="text-sm font-black text-emerald-400 font-mono">
                                  {team.average.toFixed(2)}
                                </span>
                              </td>
                              <td className="py-4 px-3 text-right">
                                <button
                                  onClick={() => setExpandedTeamId(isExpanded ? null : team.id)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-[9px] font-bold text-gray-200"
                                >
                                  {isExpanded ? 'Hide' : 'Rubric'}
                                </button>
                              </td>
                            </tr>

                            {/* Collapse details */}
                            {isExpanded && (
                              <tr>
                                <td colSpan={6} className="bg-slate-950 p-4 border-b border-indigo-500/10">
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                      <div className="p-3 bg-slate-900 border border-white/5 rounded-xl">
                                        <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Innovation</span>
                                        <span className="text-xs font-bold text-indigo-400 font-mono block mt-1">
                                          {team.breakdown.innovation} / 10
                                        </span>
                                      </div>
                                      <div className="p-3 bg-slate-900 border border-white/5 rounded-xl">
                                        <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Execution</span>
                                        <span className="text-xs font-bold text-emerald-400 font-mono block mt-1">
                                          {team.breakdown.execution} / 10
                                        </span>
                                      </div>
                                      <div className="p-3 bg-slate-900 border border-white/5 rounded-xl">
                                        <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Design</span>
                                        <span className="text-xs font-bold text-purple-400 font-mono block mt-1">
                                          {team.breakdown.design} / 10
                                        </span>
                                      </div>
                                      <div className="p-3 bg-slate-900 border border-white/5 rounded-xl">
                                        <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Presentation</span>
                                        <span className="text-xs font-bold text-amber-400 font-mono block mt-1">
                                          {team.breakdown.pitch} / 10
                                        </span>
                                      </div>
                                    </div>

                                    {/* Written judge comments */}
                                    {tScores.length > 0 && (
                                      <div className="space-y-2">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase block tracking-wider">Remarks:</span>
                                        {tScores.map((s, idx) => (
                                          <div key={idx} className="p-2.5 bg-slate-900 rounded border border-white/5 text-[10px] text-gray-300">
                                            <strong className="text-[#818cf8]">{s.judgeId}:</strong> "{s.feedback || 'No written remarks.'}"
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Announcements Feed */}
          {currentTab === 'broadcasts' && (
            <div className="space-y-6">
              
              {/* Broadcast push studio */}
              {role === 'organizer' && (
                <div className="bg-[#121824] border border-white/5 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-[#818cf8] flex items-center gap-2">
                    <Megaphone className="w-4 h-4" /> Broadcast Studio (Emergency Push)
                  </h3>
                  
                  <form onSubmit={handleBroadcastSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Announcement Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Closing Ceremony Timing"
                          value={orgTitle}
                          onChange={(e) => setOrgTitle(e.target.value)}
                          className="w-full bg-[#0B0F17] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-[#6366F1]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Category</label>
                        <select
                          value={orgCategory}
                          onChange={(e) => setOrgCategory(e.target.value)}
                          className="w-full bg-[#0B0F17] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-[#6366F1] cursor-pointer"
                        >
                          <option value="General">General</option>
                          <option value="Schedule">Schedule</option>
                          <option value="Venue">Venue</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Announcement Body</label>
                      <textarea
                        placeholder="Type alert details..."
                        value={orgText}
                        onChange={(e) => setOrgText(e.target.value)}
                        className="w-full bg-[#0B0F17] border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-[#6366F1]"
                        rows={3}
                        required
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">
                      Broadcast Alert
                    </button>
                  </form>
                </div>
              )}

              {/* Feed */}
              <div className="bg-[#121824] border border-white/5 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4">Urgent Broadcast Stream</h3>
                <div className="space-y-3">
                  {broadcasts.map(b => (
                    <div key={b.id} className="p-4 bg-[#0B0F17] border border-white/5 rounded-xl space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {b.category}
                        </span>
                        <span className="text-gray-500 font-mono">{b.time}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1.5">{b.title}</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT WING: Command Telemetry Feed */}
        <div className="space-y-6">

          {/* Metric telemetry dials */}
          <div className="bg-[#121824] border border-white/5 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Command Telemetry Feed</h3>
            
            <div className="space-y-3.5">
              {/* Checkin dial */}
              <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Checked-in Node Ratio</span>
                  <strong className="text-base text-white font-mono mt-1 block">{totalCheckedin} / {totalRegistered}</strong>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-mono font-bold">
                    {Math.round((totalCheckedin / (totalRegistered || 1)) * 100)}% Verified
                  </span>
                </div>
              </div>

              {/* Submissions count */}
              <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Active Commit Submissions</span>
                  <strong className="text-base text-white font-mono mt-1 block">{submissionsCount} / {teams.length} Teams</strong>
                </div>
                <div className="text-right">
                  <span className="text-xs text-purple-400 font-mono font-bold">
                    {Math.round((submissionsCount / (teams.length || 1)) * 100)}% Committed
                  </span>
                </div>
              </div>

              {/* Evaluation progress */}
              <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Evaluation Rubric Count</span>
                  <strong className="text-base text-white font-mono mt-1 block">{totalEvaluationCount} Logs</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Alert stream box */}
          <div className="bg-[#121824] border border-white/5 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Live Broadcast Alerts</h3>
            
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {broadcasts.map(b => (
                <div key={b.id} className="p-3 bg-[#0B0F17] border border-white/5 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-[8px] font-mono">
                    <span className="text-purple-400 uppercase font-bold">[{b.category}]</span>
                    <span className="text-gray-500">{b.time}</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-white leading-tight">{b.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
