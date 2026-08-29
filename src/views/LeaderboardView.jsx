'use client';

import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import confetti from 'canvas-confetti';
import { Trophy, Medal, Filter, ChevronDown, ChevronUp, Eye, Sparkles } from 'lucide-react';

export const LeaderboardView = () => {
  const { leaderboardStandings, scores, judges } = useEventContext();
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  const tracks = ['ALL', 'AI / ML', 'Open Innovation', 'Sustainability', 'Web3 & Crypto', 'FinTech'];

  const filteredStandings = leaderboardStandings.filter(team => {
    return selectedTrack === 'ALL' || team.track.toLowerCase().includes(selectedTrack.toLowerCase());
  });

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-xs">
      
      {/* Header Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-amber-950/40 via-[#05070f] to-indigo-950/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-400" /> Rankings Live
              </span>
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                Score Aggregator
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white font-heading">
              Official Hackathon Standings
            </h2>
            <p className="text-gray-400 mt-1">
              Weighted average scores computed from judge innovation, execution, design, and pitch rubrics
            </p>
          </div>

          <button 
            onClick={triggerCelebration} 
            className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/15"
          >
            <Sparkles className="w-4 h-4 text-amber-950" /> Trigger Celebration 🎉
          </button>
        </div>
      </div>

      {/* Track Filter Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Filter standings:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {tracks.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTrack(t)}
              className={`px-3 py-1.5 rounded-xl text-[10px] uppercase font-bold border transition-all ${
                selectedTrack === t 
                  ? 'bg-amber-500 text-gray-950 border-amber-500 shadow-lg shadow-amber-500/10' 
                  : 'bg-slate-900 text-gray-400 hover:text-white border-white/5'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Podium Showcase (Top 3) */}
      {filteredStandings.length >= 3 && selectedTrack === 'ALL' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-end">
          
          {/* Silver Rank 2 */}
          <div className="glass-card p-5 text-center border-t-4 border-t-gray-400 order-2 md:order-1 mt-4">
            <div className="w-10 h-10 rounded-full bg-gray-400/10 text-gray-300 font-extrabold text-sm flex items-center justify-center mx-auto mb-2.5 border border-gray-400/25">
              🥈 2
            </div>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider block w-fit mx-auto mb-1">
              {filteredStandings[1].track}
            </span>
            <h3 className="text-sm font-bold text-white leading-tight">{filteredStandings[1].name}</h3>
            <p className="text-[10px] text-gray-400 italic mt-0.5">"{filteredStandings[1].tagline}"</p>
            <div className="text-xl font-extrabold text-gray-200 mt-2 font-mono">
              {filteredStandings[1].averageScore.toFixed(2)} <span className="text-[10px] text-gray-500 font-mono">/ 10</span>
            </div>
          </div>

          {/* Gold Rank 1 */}
          <div className="glass-card p-6 text-center border-t-4 border-t-amber-400 order-1 md:order-2 bg-gradient-to-b from-amber-950/20 to-slate-900/60 shadow-amber-500/5 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-300 font-extrabold text-base flex items-center justify-center mx-auto mb-2.5 border border-amber-400/30 shadow-lg shadow-amber-500/20">
              👑 1
            </div>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider block w-fit mx-auto mb-1">
              {filteredStandings[0].track}
            </span>
            <h3 className="text-base font-extrabold text-white leading-tight">{filteredStandings[0].name}</h3>
            <p className="text-[10px] text-gray-300 italic mt-0.5">"{filteredStandings[0].tagline}"</p>
            <div className="text-2xl font-black text-amber-400 mt-3 font-mono">
              {filteredStandings[0].averageScore.toFixed(2)} <span className="text-xs text-gray-500 font-mono">/ 10</span>
            </div>
          </div>

          {/* Bronze Rank 3 */}
          <div className="glass-card p-5 text-center border-t-4 border-t-amber-700 order-3 mt-4">
            <div className="w-10 h-10 rounded-full bg-amber-900/10 text-amber-500 font-extrabold text-sm flex items-center justify-center mx-auto mb-2.5 border border-amber-700/25">
              🥉 3
            </div>
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider block w-fit mx-auto mb-1">
              {filteredStandings[2].track}
            </span>
            <h3 className="text-sm font-bold text-white leading-tight">{filteredStandings[2].name}</h3>
            <p className="text-[10px] text-gray-400 italic mt-0.5">"{filteredStandings[2].tagline}"</p>
            <div className="text-xl font-extrabold text-amber-500 mt-2 font-mono">
              {filteredStandings[2].averageScore.toFixed(2)} <span className="text-[10px] text-gray-500 font-mono">/ 10</span>
            </div>
          </div>

        </div>
      )}

      {/* Rankings List */}
      <div className="glass-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 uppercase tracking-wider text-[9px]">
                <th className="py-3 px-3 text-center">Rank</th>
                <th className="py-3 px-3">Team Payload</th>
                <th className="py-3 px-3">Event Track</th>
                <th className="py-3 px-3 text-center">Evaluations</th>
                <th className="py-3 px-3 text-center">Avg Standing</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStandings.map((team, index) => {
                const rank = index + 1;
                const isExpanded = expandedTeamId === team.id;
                const teamScoreList = scores.filter(s => s.teamId === team.id);

                return (
                  <React.Fragment key={team.id}>
                    <tr className="hover:bg-white/5 transition-colors">
                      
                      {/* Rank badge */}
                      <td className="py-4 px-3 text-center">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-extrabold font-mono text-[10px] ${
                          rank === 1 ? 'bg-amber-500 text-gray-950' : rank === 2 ? 'bg-gray-400 text-gray-950' : rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-900 text-gray-400 border border-white/5'
                        }`}>
                          #{rank}
                        </span>
                      </td>

                      {/* Team details */}
                      <td className="py-4 px-3">
                        <div className="font-bold text-white text-xs">{team.name}</div>
                        <div className="text-[10px] text-gray-400 italic mt-0.5 leading-snug">{team.tagline}</div>
                      </td>

                      {/* Track */}
                      <td className="py-4 px-3">
                        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          {team.track}
                        </span>
                      </td>

                      {/* Evaluator counts */}
                      <td className="py-4 px-3 text-center">
                        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          {team.judgeCount} Judge{team.judgeCount !== 1 ? 's' : ''}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="py-4 px-3 text-center">
                        <span className="text-sm font-black text-emerald-400 font-mono">
                          {team.averageScore.toFixed(2)}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-3 text-right">
                        <button
                          onClick={() => setExpandedTeamId(isExpanded ? null : team.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 hover:bg-slate-800 text-[10px] font-bold text-gray-200 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {isExpanded ? 'Hide Rubric' : 'View Rubric'}
                        </button>
                      </td>
                    </tr>

                    {/* Rubrics breakdown */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={6} className="bg-[#05070f]/90 p-4 border-b border-indigo-500/15">
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                              Category Rubric Breakdown
                            </h4>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                              <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                                <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Innovation (25%)</span>
                                <span className="text-sm font-bold text-indigo-400 font-mono block mt-1">
                                  {team.breakdown.innovation} / 10
                                </span>
                              </div>

                              <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                                <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Execution (25%)</span>
                                <span className="text-sm font-bold text-emerald-400 font-mono block mt-1">
                                  {team.breakdown.execution} / 10
                                </span>
                              </div>

                              <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                                <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Design & UX (25%)</span>
                                <span className="text-sm font-bold text-purple-400 font-mono block mt-1">
                                  {team.breakdown.design} / 10
                                </span>
                              </div>

                              <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                                <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Pitch & Presentation (25%)</span>
                                <span className="text-sm font-bold text-amber-400 font-mono block mt-1">
                                  {team.breakdown.pitch} / 10
                                </span>
                              </div>
                            </div>

                            {/* Feedbacks list */}
                            {teamScoreList.length > 0 && (
                              <div className="space-y-2 pt-2">
                                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Written Evaluator Remarks:</span>
                                {teamScoreList.map((s, idx) => {
                                  const jObj = judges.find(j => j.id === s.judgeId);
                                  return (
                                    <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-white/5 text-[10px] text-gray-300 leading-relaxed">
                                      <strong className="text-purple-300 font-semibold">{jObj?.name || s.judgeId}:</strong> "{s.feedback || 'No written feedback comments.'}"
                                    </div>
                                  );
                                })}
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
  );
};
