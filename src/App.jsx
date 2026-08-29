'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  Terminal, 
  QrCode, 
  Award, 
  Trophy, 
  Megaphone, 
  Sliders, 
  Users, 
  Search, 
  ShieldCheck, 
  Cpu, 
  AlertTriangle,
  RefreshCw,
  Send,
  MessageSquare,
  Globe,
  Github
} from 'lucide-react';

export default function NexusHackOS() {
  const [role, setRole] = useState('participant'); // participant | judge | organizer

  // Dynamic Telemetry State
  const [checkInCount, setCheckInCount] = useState(184);
  const [attempts, setAttempts] = useState(0);
  const [repoUrl, setRepoUrl] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    '[NEXUS READY] Listening for telemetry nodes...',
    '[RADAR STATUS] Real-Time mesh mapping active.'
  ]);
  const [selectedTag, setSelectedTag] = useState('ALL');

  // Interactive Matchmaking Radar Tags
  const matchmakingRadars = [
    { name: 'Alex Rivera', role: 'Prompt Specialist', tags: ['#PromptEngineers', '#LLMOps'], bio: 'Optimizing agentic workflows.' },
    { name: 'Sophia Chen', role: 'AI Model Engineer', tags: ['#LLMOps', '#RustDevs'], bio: 'PyTorch & custom transformers.' },
    { name: 'Marcus Vance', role: 'Frontend Architect', tags: ['#FullStack', '#Figma'], bio: 'Glassmorphism cyberpunk UI/UX.' },
    { name: 'Priyah Sharma', role: 'Data Scientist', tags: ['#AIWhisperers', '#LLMOps'], bio: 'Vector embeddings matching.' }
  ];

  // Data Collections (Persistent using localStorage)
  const [broadcasts, setBroadcasts] = useState([
    { id: 1, tag: 'CRITICAL', time: '15:30 IST', text: 'GitHub repository must have strictly 1 branch.' },
    { id: 2, tag: 'INFO', time: '16:00 IST', text: 'Judge scoring round active in 30 minutes.' }
  ]);

  const [submissions, setSubmissions] = useState([
    { id: 'NX-701', team: 'CyberPrompt', repo: 'github.com/cyber/prompt', aiScore: 9, archScore: 9, uiScore: 10, feedback: 'Stunning prompt optimization mesh.' },
    { id: 'NX-702', team: 'AetherLab', repo: 'github.com/aether/lab', aiScore: 8, archScore: 7, uiScore: 8, feedback: 'Solid model pipeline integration.' }
  ]);

  const [selectedSub, setSelectedSub] = useState('NX-701');
  const [rubrics, setRubrics] = useState({ ai: 6, arch: 6, ui: 6 });
  const [feedback, setFeedback] = useState('');
  const [broadcastText, setBroadcastText] = useState('');

  // Hydration sync
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('nx_submissions');
    if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));

    const savedBroadcasts = localStorage.getItem('nx_broadcasts');
    if (savedBroadcasts) setBroadcasts(JSON.parse(savedBroadcasts));

    const savedCount = localStorage.getItem('nx_checkin_count');
    if (savedCount) setCheckInCount(parseInt(savedCount));

    const savedAttempts = localStorage.getItem('nx_attempts');
    if (savedAttempts) setAttempts(parseInt(savedAttempts));
  }, []);

  const saveState = (subs, broads, count, atts) => {
    localStorage.setItem('nx_submissions', JSON.stringify(subs));
    localStorage.setItem('nx_broadcasts', JSON.stringify(broads));
    localStorage.setItem('nx_checkin_count', count.toString());
    localStorage.setItem('nx_attempts', atts.toString());
  };

  // Handlers
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (attempts >= 2) {
      setTerminalLogs((prev) => [...prev, '⚡ ERR: Maximum 2 submission attempts exceeded. Connection refused.']);
      return;
    }
    if (!repoUrl.includes('github.com')) {
      setTerminalLogs((prev) => [...prev, '⚡ ERR: Invalid GitHub URI syntax. Format must match github.com/user/repo']);
      return;
    }

    setTerminalLogs((prev) => [
      ...prev,
      `$ git clone ${repoUrl}`,
      '⚡ [RESOLVING] github.com remote heads...',
      '⚡ [CHECKING] Listing remote branch manifests...',
      '⚡ [COMPLIANCE] Only 1 branch ("main") detected. OK.',
      '⚡ [PAYLOAD] Target size: 242 KB. Under 10 MB. OK.'
    ]);

    setTimeout(() => {
      const newSub = {
        id: `NX-70${submissions.length + 1}`,
        team: `Hacker Team ${submissions.length + 1}`,
        repo: repoUrl.replace('https://', '').replace('http://', ''),
        aiScore: 0,
        archScore: 0,
        uiScore: 0,
        feedback: ''
      };

      const updatedSubs = [...submissions, newSub];
      const nextAttempts = attempts + 1;
      setSubmissions(updatedSubs);
      setAttempts(nextAttempts);
      setTerminalLogs((prev) => [...prev, `⚡ SUCCESS: Repository payload committed. [Attempt ${nextAttempts}/2]`]);
      setRepoUrl('');
      saveState(updatedSubs, broadcasts, checkInCount, nextAttempts);
    }, 1200);
  };

  const handleJudgeSubmit = (e) => {
    e.preventDefault();
    const updatedSubs = submissions.map((s) =>
      s.id === selectedSub
        ? { ...s, aiScore: rubrics.ai, archScore: rubrics.arch, uiScore: rubrics.ui, feedback }
        : s
    );
    setSubmissions(updatedSubs);
    saveState(updatedSubs, broadcasts, checkInCount, attempts);
    
    // Confetti effect on successful scoring
    confetti({
      particleCount: 80,
      spread: 60,
      colors: ['#00F2FE', '#7000FF', '#ffffff'],
      origin: { y: 0.8 }
    });
  };

  const handlePushBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    const newBroadcasts = [
      { id: broadcasts.length + 1, tag: 'BROADCAST', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: broadcastText },
      ...broadcasts
    ];
    setBroadcasts(newBroadcasts);
    setBroadcastText('');
    saveState(submissions, newBroadcasts, checkInCount, attempts);
  };

  const triggerManualCheckin = () => {
    const nextCount = checkInCount + 1;
    setCheckInCount(nextCount);
    saveState(submissions, broadcasts, nextCount, attempts);
    
    // Push visual alert to logs
    setTerminalLogs((prev) => [
      ...prev,
      `⚡ [TELEMETRY] Badge checked-in. Count updated to ${nextCount}`
    ]);
  };

  const sortedLeaderboard = [...submissions].sort(
    (a, b) => (b.aiScore + b.archScore + b.uiScore) - (a.aiScore + a.archScore + a.uiScore)
  );

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 font-mono p-4 md:p-8">
      
      {/* Platform Header */}
      <header className="border border-[#00F2FE]/30 bg-[#0B0F17]/95 rounded-2xl p-5 mb-6 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(0,242,254,0.15)]">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#7000FF] flex items-center justify-center font-black text-xl text-black shadow-lg shadow-[#00F2FE]/25">
            NX
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#7000FF] font-heading">
                NEXUSHACK OS
              </h1>
              <span className="text-[8px] font-bold bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30 px-2 py-0.5 rounded-full uppercase tracking-widest">
                Mesh Active
              </span>
            </div>
            <p className="text-[10px] text-cyan-500/70 tracking-widest uppercase">Smart Event Command Infrastructure</p>
          </div>
        </div>

        {/* Custom Persona Role Switcher */}
        <div className="flex bg-[#070A10] border border-[#00F2FE]/20 p-1 rounded-xl">
          {[
            { id: 'participant', label: 'Participant Mode' },
            { id: 'judge', label: 'Judge Mode' },
            { id: 'organizer', label: 'Command Console' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${
                role === r.id
                  ? 'bg-gradient-to-r from-[#00F2FE] to-[#7000FF] text-black shadow-lg shadow-[#00F2FE]/20'
                  : 'text-slate-400 hover:text-[#00F2FE]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Grid: LEFT WING and RIGHT WING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT WING: Dynamic Workstation */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. PARTICIPANT ACTIVE VIEW */}
          {role === 'participant' && (
            <>
              {/* Cyber-Pass QR Identity Verification */}
              <div className="border border-slate-800 bg-[#0B0F17] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FE]/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xs font-bold text-[#00F2FE] tracking-wider uppercase">
                    Cyber-Pass QR Identity Verification
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase tracking-wider">
                    <span className="pulse-dot"></span> Clearance Granted
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Glowing QR */}
                  <div className="bg-white p-3 rounded-xl inline-block border-2 border-[#00F2FE]/50 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                    <QRCodeSVG 
                      value="NX-PASS-PART-101-VERIFIED" 
                      size={110} 
                      level="H" 
                      includeMargin={false}
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <p className="text-xs text-slate-400">Attendee Node ID: <span className="text-white font-mono">PART-101-ALEX</span></p>
                    <p className="text-xs text-slate-400">Event Track: <span className="text-[#00F2FE] font-bold">AI / ML Agent Mesh</span></p>
                    <p className="text-[10px] text-gray-500 max-w-sm">Present this pass at verification stations for instant admittance logging.</p>
                  </div>
                </div>
              </div>

              {/* Matchmaking Radar (Skill-Tag Search) */}
              <div className="border border-slate-800 bg-[#0B0F17] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xs font-bold text-violet-400 tracking-wider uppercase">
                    Matchmaking Radar (Skill-Tag Search)
                  </h2>
                  <div className="flex gap-1 text-[9px]">
                    {['ALL', '#PromptEngineers', '#LLMOps', '#FullStack', '#RustDevs'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-2 py-0.5 rounded border transition-all ${
                          selectedTag === tag 
                            ? 'bg-[#7000FF]/20 text-[#a855f7] border-[#7000FF]/40' 
                            : 'bg-[#05070f] text-gray-400 border-white/5 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Radar Grid List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchmakingRadars
                    .filter(m => selectedTag === 'ALL' || m.tags.includes(selectedTag))
                    .map((item, idx) => (
                      <div key={idx} className="bg-[#070A10] p-4 rounded-xl border border-white/5 space-y-2 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-xs font-bold text-white leading-tight">{item.name}</h4>
                              <p className="text-[9px] text-cyan-400 mt-0.5">{item.role}</p>
                            </div>
                            <span className="text-[8px] bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/20 px-1 rounded">Radar Active</span>
                          </div>
                          <p className="text-[10px] text-gray-400 leading-relaxed mt-2">{item.bio}</p>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-2">
                          <div className="flex gap-1">
                            {item.tags.map(t => (
                              <span key={t} className="text-[8px] text-purple-300 font-mono">{t}</span>
                            ))}
                          </div>
                          <button className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/30 text-[9px] font-bold">
                            Connect
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Single-Branch GitHub Submission Terminal */}
              <div className="border border-slate-800 bg-[#0B0F17] rounded-2xl p-6">
                <h2 className="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-1">
                  Single-Branch GitHub Submission Terminal
                </h2>
                <p className="text-[10px] text-slate-400 mb-4">&gt; Enforces strictly 1 branch commit &amp; payload cap of &lt;10MB.</p>

                <form onSubmit={handleTerminalSubmit} className="space-y-4">
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-cyan-400 text-xs">$</span>
                    <input
                      type="url"
                      placeholder="https://github.com/user/my-custom-project"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="w-full bg-[#070A10] border border-slate-800 rounded-xl pl-8 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00F2FE] font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Attempts Committed: {attempts}/2</span>
                    <button
                      type="submit"
                      disabled={attempts >= 2}
                      className="bg-gradient-to-r from-[#00F2FE] to-[#7000FF] text-black font-bold px-4 py-2 rounded-xl text-xs hover:opacity-90 disabled:opacity-50"
                    >
                      COMMIT PAYLOAD
                    </button>
                  </div>
                </form>

                {/* Simulated Logs window */}
                <div className="mt-4 bg-[#04060A] border border-slate-900 rounded-xl p-3 h-28 overflow-y-auto space-y-1 text-[10px] font-mono">
                  {terminalLogs.map((log, i) => (
                    <p key={i} className={
                      log.startsWith('⚡ ERR') 
                        ? 'text-rose-400' 
                        : log.startsWith('⚡ SUCCESS') 
                        ? 'text-emerald-400' 
                        : log.startsWith('$') 
                        ? 'text-white' 
                        : 'text-cyan-500/70'
                    }>
                      {log}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 2. JUDGE ACTIVE VIEW */}
          {role === 'judge' && (
            <div className="border border-slate-800 bg-[#0B0F17] rounded-2xl p-6">
              <h2 className="text-xs font-bold text-violet-400 tracking-wider uppercase mb-4">
                Holographic Rubric Scoring Interface
              </h2>
              
              <form onSubmit={handleJudgeSubmit} className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Target Team Submission</label>
                  <select
                    value={selectedSub}
                    onChange={(e) => {
                      setSelectedSub(e.target.value);
                      const target = submissions.find(s => s.id === e.target.value);
                      if (target) {
                        setRubrics({ ai: target.aiScore, arch: target.archScore, ui: target.uiScore });
                        setFeedback(target.feedback || '');
                      }
                    }}
                    className="w-full bg-[#070A10] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-[#7000FF]"
                  >
                    {submissions.map((s) => (
                      <option key={s.id} value={s.id} className="bg-[#05070f]">{s.team} ({s.id})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4 bg-[#070A10] p-4 rounded-xl border border-slate-800">
                  
                  {/* Rubric Slider 1 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Prompt Engineering depth</span>
                      <span className="text-cyan-400 font-bold">{rubrics.ai}/10</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="10" 
                      value={rubrics.ai} 
                      onChange={(e) => setRubrics({ ...rubrics, ai: parseInt(e.target.value) })} 
                      className="w-full accent-cyan-400 cursor-pointer" 
                    />
                  </div>

                  {/* Rubric Slider 2 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Architecture Integration</span>
                      <span className="text-purple-400 font-bold">{rubrics.arch}/10</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="10" 
                      value={rubrics.arch} 
                      onChange={(e) => setRubrics({ ...rubrics, arch: parseInt(e.target.value) })} 
                      className="w-full accent-purple-500 cursor-pointer" 
                    />
                  </div>

                  {/* Rubric Slider 3 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">UI/UX prototype finish</span>
                      <span className="text-cyan-400 font-bold">{rubrics.ui}/10</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="10" 
                      value={rubrics.ui} 
                      onChange={(e) => setRubrics({ ...rubrics, ui: parseInt(e.target.value) })} 
                      className="w-full accent-cyan-400 cursor-pointer" 
                    />
                  </div>

                </div>

                {/* Score aggregate preview */}
                <div className="bg-[#7000FF]/10 border border-[#7000FF]/30 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-purple-300 font-semibold">Live Cumulative Score:</span>
                  <strong className="text-cyan-400 text-base font-mono">
                    {((rubrics.ai + rubrics.arch + rubrics.ui) / 3).toFixed(1)} / 10.0
                  </strong>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Evaluation remarks</label>
                  <textarea
                    rows="3"
                    placeholder="Enter mentor remarks..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-[#070A10] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-[#7000FF]"
                  />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-[#7000FF] to-[#00F2FE] text-black font-bold py-3 rounded-xl text-xs hover:opacity-90 transition-all">
                  COMMIT SCORE TO MATRIX
                </button>
              </form>
            </div>
          )}

          {/* 3. ORGANIZER COMMAND ACTIVE VIEW */}
          {role === 'organizer' && (
            <div className="space-y-6">
              
              {/* Telemetry counters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-800 bg-[#0B0F17] p-5 rounded-2xl flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Live Check-ins</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <p className="text-3xl font-extrabold text-[#00F2FE] font-mono">{checkInCount}</p>
                    <button 
                      onClick={triggerManualCheckin}
                      className="px-2.5 py-1 text-[9px] font-bold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    >
                      Check-in Node
                    </button>
                  </div>
                </div>
                
                <div className="border border-slate-800 bg-[#0B0F17] p-5 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Commits Logged</span>
                  <p className="text-3xl font-extrabold text-[#7000FF] font-mono mt-2">{submissions.length}</p>
                </div>
              </div>

              {/* Broadcast push studio */}
              <div className="border border-slate-800 bg-[#0B0F17] rounded-2xl p-6">
                <h2 className="text-xs font-bold text-[#00F2FE] tracking-wider uppercase mb-4">Emergency Push Broadcast</h2>
                <form onSubmit={handlePushBroadcast} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type urgent announcements to push to all nodes..."
                    value={broadcastText}
                    onChange={(e) => setBroadcastText(e.target.value)}
                    className="flex-grow bg-[#070A10] border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00F2FE]"
                  />
                  <button type="submit" className="bg-[#00F2FE] hover:bg-[#00F2FE]/90 text-black font-bold px-4 py-2 rounded-xl text-xs transition-all shrink-0">
                    BROADCAST
                  </button>
                </form>
              </div>

              {/* Checkin Registry lists */}
              <div className="border border-slate-800 bg-[#0B0F17] rounded-2xl p-6">
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Live Attendee Node Registry</h2>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {matchmakingRadars.map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#05070f] border border-white/5 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-200 text-xs">{item.name}</h4>
                        <p className="text-[9px] text-gray-500">{item.role}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT WING: Command Center Telemetry */}
        <div className="space-y-6">

          {/* Live Event Metrics & Leaderboard */}
          <div className="border border-slate-800 bg-[#0B0F17] rounded-2xl p-6 shadow-[0_0_15px_rgba(112,0,255,0.05)]">
            <h2 className="text-xs font-bold text-[#00F2FE] tracking-wider uppercase mb-4 flex items-center justify-between">
              <span>Telemetry Leaderboard</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F2FE] animate-ping shrink-0"></span>
            </h2>

            <div className="space-y-3">
              {sortedLeaderboard.map((sub, idx) => {
                const total = sub.aiScore + sub.archScore + sub.uiScore;
                return (
                  <div key={sub.id} className="bg-[#070A10] border border-slate-800/80 p-3 rounded-xl flex items-center justify-between hover:border-[#7000FF]/30 transition-all">
                    <div>
                      <p className="text-xs font-bold text-white">#{idx + 1} {sub.team}</p>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.5">{sub.repo}</p>
                    </div>
                    <span className="text-xs font-bold text-[#00F2FE] border border-[#00F2FE]/20 bg-[#00F2FE]/5 px-2 py-1 rounded font-mono">
                      {total} PTS
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Emergency Broadcast Push Stream */}
          <div className="border border-slate-800 bg-[#0B0F17] rounded-2xl p-6">
            <h2 className="text-xs font-bold text-[#7000FF] tracking-wider uppercase mb-4">Emergency Broadcast Feed</h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {broadcasts.map((b) => (
                <div key={b.id} className="bg-[#070A10] border border-slate-800/80 p-3 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className={`font-bold ${
                      b.tag === 'CRITICAL' 
                        ? 'text-rose-400' 
                        : b.tag === 'BROADCAST' 
                        ? 'text-[#00F2FE]' 
                        : 'text-indigo-400'
                    }`}>
                      [{b.tag}]
                    </span>
                    <span className="text-slate-500 font-mono">{b.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">{b.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
