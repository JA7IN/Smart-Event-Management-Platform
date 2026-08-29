'use client';

import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import { QRBadgeModal } from '../components/QRBadgeModal';
import { 
  UserCheck, 
  QrCode, 
  Send, 
  Github, 
  ExternalLink, 
  Users, 
  CheckCircle2, 
  Clock, 
  Bell, 
  Sparkles,
  Code,
  Globe
} from 'lucide-react';

export const ParticipantView = () => {
  const { 
    activeParticipant, 
    activeParticipantTeam, 
    announcements, 
    submitProject,
    setCurrentView
  } = useEventContext();

  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [repoUrl, setRepoUrl] = useState(activeParticipantTeam?.repoUrl || '');
  const [demoUrl, setDemoUrl] = useState(activeParticipantTeam?.demoUrl || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeParticipantTeam) return;
    submitProject(activeParticipantTeam.id, repoUrl, demoUrl);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-xs">
      
      {/* Header Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-indigo-950/40 via-[#05070f] to-purple-950/40 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-indigo-500/30">
              {activeParticipant?.name?.substring(0, 2).toUpperCase() || 'PA'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white font-heading">{activeParticipant?.name}</h1>
                {activeParticipant?.checkInStatus ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Checked In
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                    <Clock className="w-2.5 h-2.5" /> Pending Check-in
                  </span>
                )}
              </div>
              <p className="text-indigo-300 font-medium mt-0.5">{activeParticipant?.role}</p>
              <p className="text-gray-400 mt-1 max-w-xl leading-relaxed">{activeParticipant?.bio}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button 
              onClick={() => setShowBadgeModal(true)}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all"
            >
              <QrCode className="w-4 h-4" /> View Ticket Pass
            </button>
            
            <button 
              onClick={() => setCurrentView('team')}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/5 transition-all"
            >
              <Users className="w-4 h-4 text-purple-400" /> Discover Teammates
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Team Status & Project Submission */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Team Status */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> Team Workspace
              </h3>
              {activeParticipantTeam ? (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wider">
                  {activeParticipantTeam.track} Track
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                  Solo Participant
                </span>
              )}
            </div>

            {activeParticipantTeam ? (
              <div className="bg-[#05070f] p-4.5 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-extrabold text-white">{activeParticipantTeam.name}</h4>
                    <p className="text-gray-400 italic text-[11px] mt-0.5">"{activeParticipantTeam.tagline}"</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    activeParticipantTeam.submissionStatus === 'Submitted' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {activeParticipantTeam.submissionStatus}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] text-gray-500 block mb-1.5 font-semibold uppercase tracking-wider">Members roster:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeParticipantTeam.members.map(mId => (
                      <span key={mId} className="bg-slate-900 border border-white/5 text-gray-300 text-[10px] py-1 px-3 rounded-lg">
                        {mId} {mId === activeParticipant?.id ? '(You)' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-[#05070f]/40 rounded-xl border-2 border-dashed border-white/5">
                <p className="text-gray-400 mb-4">You are currently looking for a hackathon team.</p>
                <button 
                  onClick={() => setCurrentView('team')} 
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all"
                >
                  Join or Form a Squad
                </button>
              </div>
            )}
          </div>

          {/* Project Submission Form */}
          <div className="glass-card p-6">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" /> Submission Console
              </h3>
              <p className="text-gray-400 mt-1">Submit repository artifacts for judge score rubrics</p>
            </div>

            {activeParticipantTeam ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">
                    GitHub Code Repository URL
                  </label>
                  <div className="relative">
                    <Github className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="url"
                      placeholder="https://github.com/neuralpulse/hack2skill-project"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none focus:border-indigo-500 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">
                    YouTube Demo Video URL
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=voice-ai-pitch"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none focus:border-indigo-500 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-gray-950 font-bold hover:bg-emerald-400 transition-all text-xs"
                >
                  Save Submission Artifacts 🚀
                </button>
              </form>
            ) : (
              <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 p-4 rounded-xl">
                ⚠️ Form or join a team first to unlock project submissions.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Live Broadcast Announcements */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-pink-400" /> Event Broadcast Ticker
          </h3>

          <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
            {announcements.map(ann => (
              <div key={ann.id} className="p-3.5 rounded-xl bg-[#05070f] border border-white/5 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-bold uppercase tracking-wider ${
                    ann.priority === 'emergency' 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {ann.category}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500">{ann.timestamp}</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">{ann.title}</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">{ann.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* QR Badge Modal */}
      {showBadgeModal && (
        <QRBadgeModal
          participant={activeParticipant}
          team={activeParticipantTeam}
          onClose={() => setShowBadgeModal(false)}
        />
      )}
    </div>
  );
};
