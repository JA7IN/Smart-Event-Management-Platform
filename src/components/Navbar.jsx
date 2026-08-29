'use client';

import React from 'react';
import { useEventContext } from '../context/EventContext';
import { 
  Terminal, 
  Layers, 
  Users, 
  Award, 
  Trophy, 
  Megaphone, 
  BookOpen, 
  QrCode,
  User,
  ShieldAlert,
  Zap
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
      
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-heading">HackPulse</span>
              <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Hack2Skill OS
              </span>
            </div>
            <div className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-0.5">
              <span className="pulse-dot"></span>
              Live Check-ins: <strong className="text-emerald-400 font-mono">{stats.totalCheckedIn}/{stats.totalRegistered}</strong>
            </div>
          </div>
        </div>

        {/* Action Controls & Dropdown Switchers */}
        <div className="flex items-center gap-3">
          
          {/* Persona selector depending on View tab */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-gray-200">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-gray-400 hidden sm:inline">Role Persona:</span>
            <select
              value={activeParticipantId}
              onChange={(e) => setActiveParticipantId(e.target.value)}
              className="bg-transparent border-none outline-none font-semibold text-gray-200 cursor-pointer"
            >
              {participants.map(p => (
                <option key={p.id} value={p.id} className="bg-[#05070f] text-white">
                  {p.name} ({p.role.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-gray-200">
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-gray-400 hidden sm:inline">Judge Context:</span>
            <select
              value={activeJudgeId}
              onChange={(e) => setActiveJudgeId(e.target.value)}
              className="bg-transparent border-none outline-none font-semibold text-gray-200 cursor-pointer"
            >
              {judges.map(j => (
                <option key={j.id} value={j.id} className="bg-[#05070f] text-white">
                  {j.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenScanner}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1.5 transition-all"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Scan Badge</span>
          </button>

        </div>

      </div>

      {/* Tabbed Navigation Bar */}
      <div className="border-t border-white/5 bg-[#070a14]/60">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar gap-1.5 py-2.5">
          {[
            { id: 'participant', label: 'Dashboard & Submissions', icon: Terminal },
            { id: 'leaderboard', label: 'Rankings & Leaderboard', icon: Trophy },
            { id: 'team', label: 'Matchmaking Portal', icon: Users },
            { id: 'resources', label: 'Developer Resources & Docs', icon: BookOpen },
            { id: 'organizer', label: 'Organizer Console', icon: Megaphone },
            { id: 'architecture', label: 'UX Blueprints', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
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
