'use client';

import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  UserCheck, 
  Award, 
  BarChart3, 
  QrCode, 
  Cpu, 
  Database, 
  Zap, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

export const ArchitectureView = () => {
  const [activeTab, setActiveTab] = useState('pipeline'); // pipeline | roles | data

  return (
    <div className="space-y-8 animate-fadeIn text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              System Architecture
            </span>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              UX Blueprint
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white font-heading">
            Platform Architecture & Data Pipeline
          </h2>
          <p className="text-gray-400 mt-1">
            Visualizing the unified multi-role workflow, state propagation, and QR verification engine
          </p>
        </div>

        <div className="flex bg-[#05070f] p-1 rounded-xl border border-white/5 text-[10px]">
          <button
            className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
              activeTab === 'pipeline' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('pipeline')}
          >
            End-to-End Pipeline
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
              activeTab === 'roles' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('roles')}
          >
            Role Map
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
              activeTab === 'data' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('data')}
          >
            Calculations
          </button>
        </div>
      </div>

      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          
          {/* Timeline Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Step 1 */}
            <div className="glass-card p-5 border-l-4 border-indigo-500">
              <div className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Stage 01</div>
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="w-5 h-5 text-indigo-400" />
                <h4 className="text-xs font-bold text-white leading-none">QR Registration</h4>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Attendees receive unique QR pass tokens mapped inside local storage state stores.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-5 border-l-4 border-emerald-500">
              <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Stage 02</div>
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-xs font-bold text-white leading-none">Access Control</h4>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Organizer scans QR pass. State triggers instant check-in timestamp logging.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-5 border-l-4 border-purple-500">
              <div className="text-[9px] font-bold text-purple-400 uppercase tracking-wider mb-2">Stage 03</div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <h4 className="text-xs font-bold text-white leading-none">Squad Assembly</h4>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Developers query skills stacks, form teams, and lock project repository links.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card p-5 border-l-4 border-amber-500">
              <div className="text-[9px] font-bold text-amber-400 uppercase tracking-wider mb-2">Stage 04</div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h4 className="text-xs font-bold text-white leading-none">Rubric Evaluation</h4>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Judges grade criteria (Innovation, Code, Design, Pitch) via interactive sliders.
              </p>
            </div>

            {/* Step 5 */}
            <div className="glass-card p-5 border-l-4 border-rose-500">
              <div className="text-[9px] font-bold text-rose-400 uppercase tracking-wider mb-2">Stage 05</div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-rose-400" />
                <h4 className="text-xs font-bold text-white leading-none">Live Ranks</h4>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Average scores are computed in real-time, feeding standing leaderboards.
              </p>
            </div>

          </div>

          {/* Infrastructure Map */}
          <div className="glass-card p-6 bg-gradient-to-r from-slate-900/60 via-indigo-950/10 to-slate-900/60">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" /> Unified Client-Side State Engine
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#05070f] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Database className="w-4 h-4" /> Global Context State
                </div>
                <ul className="space-y-1.5 text-gray-400 text-[10px] leading-relaxed">
                  <li>• React Context wrapper stores event nodes</li>
                  <li>• Dynamic reactive rerenders upon user input</li>
                  <li>• LocalStorage persistence prevents state loss</li>
                  <li>• Extremely lightweight footprint</li>
                </ul>
              </div>

              <div className="bg-[#05070f] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> QR Verification Engine
                </div>
                <ul className="space-y-1.5 text-gray-400 text-[10px] leading-relaxed">
                  <li>• Renders QR Passes dynamically on canvas</li>
                  <li>• Simulates camera scanning station verification</li>
                  <li>• Auto-timestamps checked-in flags</li>
                  <li>• Updates organizer check-in gauges</li>
                </ul>
              </div>

              <div className="bg-[#05070f] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Broadcast Stream
                </div>
                <ul className="space-y-1.5 text-gray-400 text-[10px] leading-relaxed">
                  <li>• Instant toast message push alerts</li>
                  <li>• Delta average calculation engine</li>
                  <li>• Filterable standings directory table</li>
                  <li>• Hot role-switcher persona emulator</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Participant */}
          <div className="glass-card p-5 border-t-4 border-t-indigo-500 space-y-3">
            <div className="flex justify-between items-center">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">Role 01</span>
            </div>
            <h3 className="text-sm font-bold text-white">Participant Dashboard</h3>
            <ul className="space-y-1.5 text-gray-400 text-[10px]">
              <li>• Pull digital QR Pass</li>
              <li>• Filter solo developers by stack</li>
              <li>• Assemble team & submit repositories</li>
              <li>• Check organizer announcements</li>
            </ul>
          </div>

          {/* Judge */}
          <div className="glass-card p-5 border-t-4 border-t-purple-500 space-y-3">
            <div className="flex justify-between items-center">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">Role 02</span>
            </div>
            <h3 className="text-sm font-bold text-white">Judge Rubrics Portal</h3>
            <ul className="space-y-1.5 text-gray-400 text-[10px]">
              <li>• Browse project repository links</li>
              <li>• Interactive criteria sliders</li>
              <li>• Log qualitative feedback comments</li>
              <li>• Secure score dispatch to aggregator</li>
            </ul>
          </div>

          {/* Organizer */}
          <div className="glass-card p-5 border-t-4 border-t-emerald-500 space-y-3">
            <div className="flex justify-between items-center">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">Role 03</span>
            </div>
            <h3 className="text-sm font-bold text-white">Organizer Console</h3>
            <ul className="space-y-1.5 text-gray-400 text-[10px]">
              <li>• Real-time check-in progress counters</li>
              <li>• Simulated verification scanning console</li>
              <li>• Broadcast alerts live to all sockets</li>
              <li>• Registry lists for manual check-ins</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Rubric Aggregator Engine</h3>
          <p className="text-gray-400">
            Scores submitted by judges are processed in real-time through the weighted aggregation engine:
          </p>

          <div className="bg-[#05070f] p-4 rounded-xl border border-white/5 text-[11px] font-mono text-indigo-300 overflow-x-auto leading-relaxed">
            {`InnovationWeight = 25% | ExecutionWeight = 25% | UXWeight = 25% | PitchWeight = 25%
WeightedScore = (Innovation × 0.25) + (Execution × 0.25) + (Design × 0.25) + (Pitch × 0.25)
FinalTeamScore = Σ(WeightedScore_j) / TotalJudges`}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-[10px]">
            <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-800/25">
              <span className="text-indigo-400 font-bold block">Innovation (25%)</span>
              <span className="text-gray-400 mt-1 block">Uniqueness of conceptual model</span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/25">
              <span className="text-emerald-400 font-bold block">Execution (25%)</span>
              <span className="text-gray-400 mt-1 block">Repository code quality & robustness</span>
            </div>
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-800/25">
              <span className="text-purple-400 font-bold block">Design & UX (25%)</span>
              <span className="text-gray-400 mt-1 block">Visual dashboard experience & transitions</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/25">
              <span className="text-amber-400 font-bold block">Pitch (25%)</span>
              <span className="text-gray-400 mt-1 block">Presentation clarity & completeness</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
