'use client';

import React from 'react';
import { useEventContext } from '../context/EventContext';
import { 
  QrCode, 
  Users, 
  Send, 
  Trophy, 
  Zap,
  User,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const Navbar = ({ onOpenScanner }) => {
  const { 
    currentView, 
    setCurrentView, 
    participants, 
    activeParticipantId, 
    setActiveParticipantId,
    activeJudgeId,
    setActiveJudgeId,
    judges,
    stats
  } = useEventContext();

  return (
    <div className="w-full bg-[#05070f]/90 backdrop-blur-md border-b border-indigo-500/10 sticky top-0 z-50">
      
      {/* Top Bar: Logo | Event Name and Role Switchers */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Event Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white font-heading">HackPulse OS</span>
            <div className="text-[10px] text-indigo-400 font-mono mt-0.5 font-bold uppercase tracking-wider">
              Smart Event Platform
            </div>
          </div>
        </div>

        {/* Role Switcher Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* Participant Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-white/5 rounded-xl px-3 py-1.5 text-[11px] text-gray-200">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={activeParticipantId}
              onChange={(e) => setActiveParticipantId(e.target.value)}
              className="bg-transparent border-none outline-none font-semibold text-gray-200 cursor-pointer"
            >
              {participants.map(p => (
                <option key={p.id} value={p.id} className="bg-[#05070f] text-white">
                  Participant: {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Judge Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-white/5 rounded-xl px-3 py-1.5 text-[11px] text-gray-200">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={activeJudgeId}
              onChange={(e) => setActiveJudgeId(e.target.value)}
              className="bg-transparent border-none outline-none font-semibold text-gray-200 cursor-pointer"
            >
              {judges.map(j => (
                <option key={j.id} value={j.id} className="bg-[#05070f] text-white">
                  Judge: {j.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenScanner}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1.5 transition-all"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">QR Scan</span>
          </button>

        </div>

      </div>

      {/* Tab Navigation Row */}
      <div className="border-t border-white/5 bg-[#070a14]/60">
        <div className="max-w-7xl mx-auto px-4 flex gap-1.5 py-2">
          {[
            { id: 'checkin', label: 'Check-in / QR', icon: QrCode },
            { id: 'team', label: 'Team Finder', icon: Users },
            { id: 'submissions', label: 'Submissions', icon: Send },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive 
                    ? 'bg-indigo-600/15 text-indigo-300 border-indigo-500/40 shadow-lg shadow-indigo-500/5' 
                    : 'text-gray-400 hover:text-white border-transparent hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
