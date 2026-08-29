'use client';

import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import { RUBRIC_CRITERIA } from '../data/mockData';
import { Code, Github, ExternalLink, Send, ShieldCheck, Award, Sliders, CheckCircle2, RefreshCw, Terminal } from 'lucide-react';

export const SubmissionsView = () => {
  const { 
    activeParticipant, 
    activeParticipantTeam, 
    activeJudgeId, 
    judges, 
    teams, 
    scores, 
    submitProject, 
    submitRubricScore 
  } = useEventContext();

  // Participant States
  const [repoUrl, setRepoUrl] = useState(activeParticipantTeam?.repoUrl || '');
  const [demoUrl, setDemoUrl] = useState(activeParticipantTeam?.demoUrl || '');

  // Simulated Single-Branch Repo Check state
  const [repoCheckUrl, setRepoCheckUrl] = useState('');
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkLogs, setCheckLogs] = useState([]);
  const [checkResult, setCheckResult] = useState(null);

  // Judge States
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
  const judgeScore = scores.find(s => s.judgeId === activeJudge?.id && s.teamId === selectedTeamId);

  // Handlers
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!activeParticipantTeam) return;
    submitProject(activeParticipantTeam.id, repoUrl, demoUrl);
  };

  const handleSliderChange = (criterionId, val) => {
    setRubricScores(prev => ({ ...prev, [criterionId]: parseFloat(val) }));
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

  // Single-Branch Repo Check simulator
  const runBranchCheck = (e) => {
    e.preventDefault();
    if (!repoCheckUrl.trim()) return;

    setCheckLoading(true);
    setCheckLogs([]);
    setCheckResult(null);

    const logs = [
      '🔍 Resolving git target host: github.com',
      '🔗 Establishing secure SSH connection handshake...',
      '📂 Fetching remote repository metadata...',
      '🛠️ Scanning branch manifests: git ls-remote --heads...',
      '📊 Computing remote repository blob contents...',
      '📂 Checking package.json node_modules declarations...',
      '🎉 Verification sequence complete!'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setCheckLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setCheckLoading(false);
          setCheckResult({
            success: true,
            branchCount: 1,
            branchName: 'main',
            payloadSizeBytes: 248320,
            payloadSizeFriendly: '242.5 KB',
            isIgnoredChecked: true,
            isValid: true
          });
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Project Rubrics
            </span>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Submissions Workspace
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white font-heading">
            Hackathon Submission & Grading Portal
          </h2>
          <p className="text-gray-400 mt-1">
            Submit team deliverables, verify git branch payload sizes, or grade entries as an evaluator
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column Stack: Submission Form & Single-Branch Repo Check */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Submission Console */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" /> Deliverables Submission Form
            </h3>

            {activeParticipantTeam ? (
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">GitHub Repository URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/JA7IN/smart-event-management"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2 px-3 text-white outline-none focus:border-indigo-500 transition-all font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">YouTube Demo Link</label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=mock-demo"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      className="w-full bg-[#05070f] border border-white/5 rounded-xl py-2 px-3 text-white outline-none focus:border-indigo-500 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all">
                  Submit Deliverables to Judges 🚀
                </button>
              </form>
            ) : (
              <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 p-4 rounded-xl">
                ⚠️ Assemble or join a squad first in the Team Finder tab to unlock submission forms.
              </div>
            )}
          </div>

          {/* Single-Branch Repo Check Card */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" /> Single-Branch &amp; Payload Validator Tool
              </h3>
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold px-2 py-0.5 rounded">
                Strict Limit Verification
              </span>
            </div>
            <p className="text-gray-400">
              Paste your public GitHub repository link below to check for single branch status (`main` default) and ensure folder size is under the **10 MB** limit.
            </p>

            <form onSubmit={runBranchCheck} className="flex gap-2">
              <input
                type="url"
                placeholder="https://github.com/JA7IN/smart-event-management"
                value={repoCheckUrl}
                onChange={(e) => setRepoCheckUrl(e.target.value)}
                className="flex-grow bg-[#05070f] border border-white/5 rounded-xl py-2 px-3 text-white outline-none focus:border-indigo-500 transition-all font-mono"
                required
              />
              <button 
                type="submit" 
                disabled={checkLoading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0"
              >
                {checkLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Run Check'}
              </button>
            </form>

            {/* Check progress console */}
            {checkLogs.length > 0 && (
              <div className="bg-[#05070f] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-gray-400 space-y-1">
                {checkLogs.map((log, idx) => (
                  <div key={idx} className={idx === checkLogs.length - 1 ? 'text-indigo-400 font-bold' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Verification result */}
            {checkResult && (
              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Compliance Verification Success!
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-[10px] text-gray-300">
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">
                    <span className="text-gray-500 block">Branches count:</span>
                    <strong className="text-white text-xs">{checkResult.branchCount} ({checkResult.branchName} only)</strong>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">
                    <span className="text-gray-500 block">Repo Payload Size:</span>
                    <strong className="text-white text-xs">{checkResult.payloadSizeFriendly}</strong>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">
                    <span className="text-gray-500 block">Node_modules checked:</span>
                    <strong className="text-white text-xs">Ignored (Correct)</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Judge Score Rubrics workspace */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            
            {/* assigned submissions list */}
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-purple-400" /> assigned submissions list
              </h3>
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {teams.map(team => {
                  const sLog = scores.find(s => s.judgeId === activeJudge?.id && s.teamId === team.id);
                  const isSelected = team.id === selectedTeamId;
                  return (
                    <div
                      key={team.id}
                      onClick={() => {
                        setSelectedTeamId(team.id);
                        if (sLog) {
                          setRubricScores(sLog.rubricScores);
                          setFeedback(sLog.feedback || '');
                        }
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                        isSelected 
                          ? 'bg-purple-950/20 border-purple-500/40' 
                          : 'bg-[#05070f] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-white">{team.name}</div>
                        <div className="text-[9px] text-gray-500">{team.track}</div>
                      </div>

                      {sLog ? (
                        <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                          Graded
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                          Pending
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rubrics Workspace */}
            <div className="border-t border-white/5 pt-4 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" /> Rubric Scoring Sliders
              </h3>

              <div className="space-y-4">
                {RUBRIC_CRITERIA.map(crit => {
                  const current = rubricScores[crit.id] || 0;
                  return (
                    <div key={crit.id} className="bg-[#05070f] p-3.5 rounded-xl border border-white/5 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-200">{crit.name}</span>
                        <span className="font-mono font-bold text-indigo-400">{current.toFixed(1)} / 10</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={current}
                        onChange={(e) => handleSliderChange(crit.id, e.target.value)}
                        className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-950 rounded"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Total Block */}
              <div className="bg-indigo-950/20 border border-indigo-500/25 p-3 rounded-xl flex items-center justify-between text-[11px]">
                <span className="text-indigo-300 font-semibold">Total Rubric score:</span>
                <strong className="text-emerald-400 font-mono text-base">{calculatedWeightedScore} / 10.0</strong>
              </div>

              {/* Feedback text */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Constructive comments</label>
                <textarea
                  placeholder="Written judge remarks..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full bg-[#05070f] border border-white/5 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
                  rows={2}
                />
              </div>

              <button 
                onClick={handleSubmitScore}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold transition-all text-xs flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-4 h-4" /> Save Score sheet
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
