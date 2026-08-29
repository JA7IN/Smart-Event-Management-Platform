'use client';

import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import { Users, Filter, Plus, UserPlus, Search, Sparkles, X } from 'lucide-react';

export const TeamFormationView = () => {
  const { 
    participants, 
    teams, 
    activeParticipant, 
    activeParticipantTeam, 
    createTeam, 
    joinTeam, 
    toggleLookingForTeam 
  } = useEventContext();

  const [selectedSkill, setSelectedSkill] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Team Form State
  const [teamName, setTeamName] = useState('');
  const [track, setTrack] = useState('AI / ML');
  const [tagline, setTagline] = useState('');

  const allSkills = ['ALL', 'React', 'Node.js', 'Python', 'AI/ML', 'UI/UX', 'Cloud', 'Docker', 'Web3'];

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkill === 'ALL' || p.skills.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()));
    return matchesSearch && matchesSkill;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    createTeam(teamName.trim(), track, tagline.trim());
    setTeamName('');
    setTagline('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-xs">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Matchmaking Hub
            </span>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Team Formation
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white font-heading">
            Solo Dev Matchmaking & Squad Assembly
          </h2>
          <p className="text-gray-400 mt-1">
            Search developer profiles by stack skills, toggle solo hiring availability, or start a new squad
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLookingForTeam}
            className={`px-3 py-1.5 rounded-xl font-semibold border transition-all ${
              activeParticipant?.lookingForTeam 
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                : 'bg-white/5 text-gray-300 border-white/5 hover:bg-white/10'
            }`}
          >
            {activeParticipant?.lookingForTeam ? '✓ Listed as Solo Seeking Squad' : '+ List as Seeking Squad'}
          </button>

          {!activeParticipantTeam && (
            <button 
              onClick={() => setShowCreateModal(true)} 
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Assemble Team
            </button>
          )}
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search dev name, tech skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Skill Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          <Filter className="w-4 h-4 text-gray-500 shrink-0 mr-1" />
          {allSkills.map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-3 py-1 rounded-full font-semibold border transition-all text-[10px] uppercase tracking-wider ${
                selectedSkill === skill 
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-lg shadow-indigo-500/10' 
                  : 'bg-slate-900 text-gray-400 hover:text-white border-white/5'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Participants Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Matchmaker Catalog ({filteredParticipants.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredParticipants.map(part => {
              const partTeam = teams.find(t => t.id === part.teamId);
              return (
                <div key={part.id} className="glass-card p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{part.name}</h4>
                        <p className="text-[10px] text-indigo-300 font-medium mt-0.5">{part.role}</p>
                      </div>
                      {part.lookingForTeam ? (
                        <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                          Looking
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-slate-800 text-gray-400 border border-white/5 truncate max-w-[80px]">
                          {partTeam ? partTeam.name : 'In Team'}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-400 mt-2 line-clamp-2 leading-relaxed">{part.bio}</p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {part.skills.map(s => (
                        <span key={s} className="bg-slate-900 text-gray-300 border border-white/5 text-[9px] px-2 py-0.5 rounded font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500">
                    <span>ID: <strong className="font-mono text-gray-400">{part.id}</strong></span>
                    {part.id === activeParticipant?.id && (
                      <span className="text-indigo-400 font-bold uppercase tracking-wider text-[8px]">Current User</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Squads Directory */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" /> Active Hackathon Squads ({teams.length})
          </h3>

          <div className="space-y-4">
            {teams.map(team => (
              <div key={team.id} className="glass-card p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wider block w-fit mb-1.5">
                      {team.track}
                    </span>
                    <h4 className="text-sm font-bold text-white">{team.name}</h4>
                  </div>
                  <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold px-2 py-0.5 rounded">
                    {team.members.length} Devs
                  </span>
                </div>

                <p className="text-[10px] text-gray-400 italic">"{team.tagline}"</p>

                <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                  <div className="text-[10px] text-gray-400">
                    Submit: <strong className="text-emerald-400">{team.submissionStatus}</strong>
                  </div>

                  {!activeParticipantTeam && (
                    <button
                      onClick={() => joinTeam(team.id)}
                      className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 flex items-center gap-1 transition-all"
                    >
                      <UserPlus className="w-3 h-3" /> Join Team
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Assemble Team Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-sm p-6 relative bg-gray-900 border border-white/5">
            
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-1 font-heading">Assemble New Hack Squad</h3>
            <p className="text-[11px] text-gray-400 mb-6">Invite team mates and select event track</p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Team Title</label>
                <input
                  type="text"
                  placeholder="e.g. Brainiacs AI"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2 px-3 text-white outline-none focus:border-indigo-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Event Track</label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2 px-3 text-white outline-none focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="AI / ML">AI / ML</option>
                  <option value="Open Innovation">Open Innovation</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Web3 & Crypto">Web3 & Crypto</option>
                  <option value="FinTech">FinTech</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Mission Statement</label>
                <input
                  type="text"
                  placeholder="e.g. Revolutionizing green event audits"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2 px-3 text-white outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all"
              >
                Assemble Squad
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
