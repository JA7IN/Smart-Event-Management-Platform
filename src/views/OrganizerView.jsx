'use client';

import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import { 
  UserCheck, 
  Users, 
  QrCode, 
  Megaphone, 
  Award, 
  Send, 
  TrendingUp,
  Search
} from 'lucide-react';

export const OrganizerView = ({ onOpenScanner }) => {
  const { 
    participants, 
    teams, 
    stats, 
    publishAnnouncement,
    checkInParticipant
  } = useEventContext();

  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('medium');
  const [searchQuery, setSearchQuery] = useState('');

  const checkInPercentage = Math.round((stats.totalCheckedIn / (stats.totalRegistered || 1)) * 100);
  const submissionPercentage = Math.round((stats.submittedProjects / (stats.totalTeams || 1)) * 100);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMsg.trim()) return;
    publishAnnouncement(broadcastTitle.trim(), broadcastMsg.trim(), category, priority);
    setBroadcastTitle('');
    setBroadcastMsg('');
  };

  const filteredParticipants = participants.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.role.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-fadeIn text-xs">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Organizer Operations
            </span>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Management Panel
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white font-heading">
            Live Check-in Analytics & Broadcast Command
          </h2>
          <p className="text-gray-400 mt-1">
            Monitor real-time attendee ratios, push emergency announcements, and check-in hackers manually
          </p>
        </div>

        <button 
          onClick={onOpenScanner} 
          className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-500 text-gray-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/15 animate-bounce"
        >
          <QrCode className="w-4 h-4" /> QR Check-in scanner
        </button>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="glass-card p-5 space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-center text-gray-400 font-bold">
            <span>Verified Attendance</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white font-mono">{stats.totalCheckedIn}</span>
            <span className="text-gray-400">/ {stats.totalRegistered} checked in</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${checkInPercentage}%` }}></div>
          </div>
          <span className="text-[9px] text-emerald-400 font-mono block">{checkInPercentage}% Verified check-ins</span>
        </div>

        {/* Metric 2 */}
        <div className="glass-card p-5 space-y-2 border-l-4 border-l-indigo-500">
          <div className="flex justify-between items-center text-gray-400 font-bold">
            <span>Hackathon Teams</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white font-mono">{stats.totalTeams}</span>
            <span className="text-gray-400">Squads</span>
          </div>
          <p className="text-[9px] text-gray-400 font-mono">Team formation matchmaking online</p>
        </div>

        {/* Metric 3 */}
        <div className="glass-card p-5 space-y-2 border-l-4 border-l-purple-500">
          <div className="flex justify-between items-center text-gray-400 font-bold">
            <span>Project Submissions</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white font-mono">{stats.submittedProjects}</span>
            <span className="text-gray-400">/ {stats.totalTeams} Teams</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full transition-all duration-300" style={{ width: `${submissionPercentage}%` }}></div>
          </div>
          <span className="text-[9px] text-purple-400 font-mono block">{submissionPercentage}% Submissions locked</span>
        </div>

        {/* Metric 4 */}
        <div className="glass-card p-5 space-y-2 border-l-4 border-l-amber-500">
          <div className="flex justify-between items-center text-gray-400 font-bold">
            <span>Rubric Evaluations</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white font-mono">{stats.totalEvaluations}</span>
            <span className="text-gray-400">Judge Rubrics</span>
          </div>
          <p className="text-[9px] text-amber-400 font-mono">Standings live aggregated</p>
        </div>

      </div>

      {/* Commands & Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Broadcast Studio */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-indigo-400" /> Broadcast Studio
            </h3>
            <p className="text-gray-400">
              Publish real-time push announcements to participants & judges instantly.
            </p>

            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Announcement Title</label>
                <input
                  type="text"
                  placeholder="e.g. Mentor Session Live"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-indigo-500 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="General">General</option>
                    <option value="Venue">Venue</option>
                    <option value="Schedule">Schedule</option>
                    <option value="Judging">Judging</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="emergency">🚨 Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Message Description</label>
                <textarea
                  placeholder="Type broadcast description..."
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  className="w-full bg-[#05070f] border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500 transition-all"
                  rows={3}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Broadcast Live
              </button>
            </form>
          </div>
        </div>

        {/* Directory Registry */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" /> Manual Attendee Registry
              </h3>
              
              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name, role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#05070f] border border-white/5 rounded-xl py-1.5 pl-9 pr-3 text-xs text-white outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 uppercase tracking-wider text-[9px]">
                    <th className="py-3 px-2">Attendee Name</th>
                    <th className="py-3 px-2">Role Persona</th>
                    <th className="py-3 px-2">Badge Token</th>
                    <th className="py-3 px-2">Scan Status</th>
                    <th className="py-3 px-2 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredParticipants.map(p => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2 font-bold text-white">
                        {p.name}
                      </td>
                      <td className="py-3 px-2 text-gray-300">{p.role}</td>
                      <td className="py-3 px-2 font-mono text-gray-400">{p.id}</td>
                      <td className="py-3 px-2">
                        {p.checkInStatus ? (
                          <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                            Verified ({p.checkInTime})
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right">
                        {!p.checkInStatus && (
                          <button
                            onClick={() => checkInParticipant(p.id)}
                            className="px-2.5 py-1 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-all"
                          >
                            Scan Manual
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
