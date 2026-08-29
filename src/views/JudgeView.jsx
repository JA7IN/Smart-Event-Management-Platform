'use client';

import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import { RUBRIC_CRITERIA } from '../data/mockData';
import { Award, CheckCircle2, ExternalLink, Github, Send, ShieldCheck, Sparkles } from 'lucide-react';

export const JudgeView = () => {
  const { 
    judges, 
    activeJudgeId, 
    teams, 
    scores, 
    submitRubricScore 
  } = useEventContext();

  const activeJudge = judges.find(j => j.id === activeJudgeId) || judges[0];
  const [selectedTeamId, setSelectedTeamId] = useState('TEAM-01');

  const [rubricScores, setRubricScores] = useState({
    innovation: 8.5,
    execution: 8.0,
    design: 9.0,
    pitch: 8.5
  });

  const [feedback, setFeedback] = useState('');

  const selectedTeam = teams.find(t => t.id === selectedTeamId) || teams[0];
  
  const existingScore = scores.find(s => s.judgeId === activeJudge?.id && s.teamId === selectedTeamId);

  const handleSliderChange = (criterionId, val) => {
    setRubricScores(prev => ({
      ...prev,
      [criterionId]: parseFloat(val)
    }));
  };

  const calculatedWeightedScore = (
    (rubricScores.innovation * 0.25) +
    (rubricScores.execution * 0.25) +
    (rubricScores.design * 0.25) +
    (rubricScores.pitch * 0.25)
  ).toFixed(2);

  const handleSubmitScore = (e) => {
    e.preventDefault();
    submitRubricScore(activeJudge.id, selectedTeam.id, rubricScores, feedback);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-xs">
      
      {/* Header Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-purple-950/40 via-[#05070f] to-indigo-950/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white font-heading">{activeJudge?.name}</h2>
                <span className="bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Evaluator Hub
                </span>
              </div>
              <p className="text-purple-300 font-medium mt-0.5">{activeJudge?.title}</p>
            </div>
          </div>

          <div className="text-gray-400 flex items-center gap-1.5">
            <span>Evaluated Submissions:</span>
            <strong className="text-emerald-400 font-mono text-sm">
              {scores.filter(s => s.judgeId === activeJudge?.id).length} / {teams.length}
            </strong>
          </div>
        </div>
      </div>

      {/* Main Panel grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Team Queue */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" /> Pending Submissions Queue
          </h3>

          <div className="space-y-3">
            {teams.map(team => {
              const judgeScore = scores.find(s => s.judgeId === activeJudge?.id && s.teamId === team.id);
              const isSelected = team.id === selectedTeamId;

              return (
                <div
                  key={team.id}
                  onClick={() => {
                    setSelectedTeamId(team.id);
                    if (judgeScore) {
                      setRubricScores(judgeScore.rubricScores);
                      setFeedback(judgeScore.feedback || '');
                    }
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/5' 
                      : 'bg-slate-900/60 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <h4 className="text-xs font-bold text-white leading-tight">{team.name}</h4>
                    {judgeScore ? (
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider flex items-center gap-0.5 shrink-0">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Evaluated
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider shrink-0">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 italic mt-1.5">"{team.tagline}"</p>

                  <div className="flex justify-between items-center text-[10px] text-gray-500 mt-3 pt-2.5 border-t border-white/5">
                    <span>Track: <strong className="text-indigo-400">{team.track}</strong></span>
                    <span>Status: <strong className="text-gray-300">{team.submissionStatus}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Rubric Scoring Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-6">
            
            {/* Team details header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">{selectedTeam?.name}</h3>
                  <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-bold px-2 py-0.5 rounded">
                    {selectedTeam?.track}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 italic mt-0.5">"{selectedTeam?.tagline}"</p>
              </div>

              {/* Sandbox verification links */}
              <div className="flex items-center gap-2">
                {selectedTeam?.repoUrl && (
                  <a
                    href={selectedTeam.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#05070f] border border-white/5 text-[10px] font-bold text-gray-200 hover:bg-slate-900 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" /> Source Code
                  </a>
                )}
                {selectedTeam?.demoUrl && (
                  <a
                    href={selectedTeam.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[10px] font-bold text-white transition-all shadow-md shadow-indigo-500/15"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Demo Pitch
                  </a>
                )}
              </div>
            </div>

            {/* Judging Sliders */}
            <form onSubmit={handleSubmitScore} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RUBRIC_CRITERIA.map(criterion => {
                  const currentScore = rubricScores[criterion.id] || 0;
                  return (
                    <div key={criterion.id} className="bg-[#05070f] p-4 rounded-xl border border-white/5 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-xs font-bold text-white leading-none">{criterion.name}</h4>
                          <p className="text-[9px] text-gray-400 mt-1">{criterion.description}</p>
                        </div>
                        <span className="text-sm font-extrabold text-indigo-400 font-mono">
                          {currentScore.toFixed(1)} / 10
                        </span>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={currentScore}
                        onChange={(e) => handleSliderChange(criterion.id, e.target.value)}
                        className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-950 rounded"
                      />

                      <div className="flex justify-between text-[8px] text-gray-500 font-mono">
                        <span>0 (Poor)</span>
                        <span>5 (Average)</span>
                        <span>10 (Awesome)</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Calculated Weighted Score */}
              <div className="bg-indigo-950/20 border border-indigo-500/25 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-indigo-300 font-semibold block">Calculated Aggregate Score</span>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">Innovation, Execution, Design, Pitch weighted at 25% each</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {calculatedWeightedScore}
                  </span>
                  <span className="text-[10px] text-gray-500 block font-mono">/ 10.0</span>
                </div>
              </div>

              {/* Qualitative feedback */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">
                  Qualitative Feedback & Structured Comments
                </label>
                <textarea
                  placeholder="Provide detailed feedback notes for the team..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full bg-[#05070f] border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500 transition-all"
                  rows={3}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-gray-950 font-bold hover:bg-emerald-400 transition-all text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <Send className="w-4 h-4" /> Submit Score Evaluation
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};
