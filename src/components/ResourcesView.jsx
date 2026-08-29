'use client';

import React from 'react';
import { BookOpen, Code, Github, Terminal, Cpu, MessageSquare, FileText, CheckCircle2, Clock } from 'lucide-react';

export const ResourcesView = () => {
  const devBoilerplates = [
    { name: 'Next.js 14 Starter App', type: 'Frontend Stack', link: 'https://github.com/nextjs/starter-app', desc: 'Pre-configured Tailwind CSS, NextAuth, and folder schemas.' },
    { name: 'Python FastAPI Boilerplate', type: 'AI/Backend Stack', link: 'https://github.com/fastapi/fastapi', desc: 'Lightweight REST API container ready for Python ML frameworks.' },
    { name: 'Figma UI Event Dashboard Kit', type: 'Design System', link: 'https://figma.com/community', desc: 'Glassmorphism template styles, buttons, navigation flows.' }
  ];

  const sandboxApis = [
    { name: 'OpenAI API Sandbox Token', key: 'sk-proj-hack2skill-xxxx-9872', desc: 'MOCKED: Generative text & vision completion endpoints.' },
    { name: 'MongoDB Serverless Sandbox', uri: 'mongodb+srv://hack2skill:xxxx@cluster0.net', desc: 'MOCKED: In-memory document storage collections.' },
    { name: 'Twilio SMS & Messaging API', sid: 'AC-twilio-hack-xxxx-8812', desc: 'MOCKED: Automated notification broadcast endpoints.' }
  ];

  const scheduleEvents = [
    { time: '10:00 AM', title: '🚀 Hackathon Opening Keynote', desc: 'Opening ceremony begins in Main Auditorium & live stream.', status: 'completed' },
    { time: '01:00 PM', title: '🍔 Lunch & Networking Hour', desc: 'Event cafeteria opens. Badge check-in required.', status: 'completed' },
    { time: '02:30 PM', title: '⏰ Project Submission Phase Open', desc: 'GitHub repo linking portals live for all teams.', status: 'current' },
    { time: '04:00 PM', title: '📊 Judging Round & Rubric Evaluation', desc: 'Evaluators assign innovation, execution, design, and pitch scores.', status: 'upcoming' },
    { time: '04:45 PM', title: '🏆 Grand Closing Ceremony', desc: 'Announcing winners from the live leaderboard standings.', status: 'upcoming' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-indigo-500/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Developer Resources
            </span>
            <span className="bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Boilerplate Boiler
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white font-heading">
            Developer Resources & API Sandboxes
          </h2>
          <p className="text-gray-400 mt-1">
            Grab Next.js boilerplates, copy mock sandbox credentials, and track official schedule timelines
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Boilerplates & API Keys */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Boilerplate Codes */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-400" /> Hackathon Code Boilerplates
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {devBoilerplates.map((bp, idx) => (
                <div key={idx} className="bg-[#05070f] p-4 rounded-xl border border-white/5 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-medium">
                        {bp.type}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1.5">{bp.name}</h4>
                    <p className="text-[10px] text-gray-400 leading-relaxed mt-1">{bp.desc}</p>
                  </div>
                  <a
                    href={bp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all w-fit"
                  >
                    <Github className="w-3.5 h-3.5" /> Clone Repository
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Mock API Sandboxes */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" /> Sponsor APIs & Sandbox Tokens
            </h3>

            <div className="space-y-3">
              {sandboxApis.map((api, idx) => (
                <div key={idx} className="bg-[#05070f] p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white">{api.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{api.desc}</p>
                  </div>
                  <div className="bg-slate-900 border border-white/5 py-1.5 px-3 rounded-lg font-mono text-[10px] text-emerald-400 select-all cursor-pointer">
                    {api.key || api.uri || api.sid}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Event Schedule Timeline */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" /> Event Live Schedule
          </h3>

          <div className="relative border-l border-white/5 pl-4 ml-2 space-y-5">
            {scheduleEvents.map((evt, idx) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                  evt.status === 'completed' 
                    ? 'bg-emerald-500 border-emerald-500' 
                    : evt.status === 'current' 
                    ? 'bg-[#090d16] border-indigo-500 animate-pulse ring-4 ring-indigo-500/20' 
                    : 'bg-[#090d16] border-gray-700'
                }`}></div>

                <div>
                  <span className={`text-[9px] font-mono font-bold ${
                    evt.status === 'completed' 
                      ? 'text-emerald-400' 
                      : evt.status === 'current' 
                      ? 'text-indigo-400' 
                      : 'text-gray-400'
                  }`}>
                    {evt.time}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5">{evt.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 space-y-2">
            <span className="text-[10px] text-gray-400 block font-semibold">Need Assistance?</span>
            <div className="flex gap-2">
              <a href="#discord" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 transition-all">
                <MessageSquare className="w-3.5 h-3.5" /> Join Discord
              </a>
              <a href="#rules" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 transition-all">
                <FileText className="w-3.5 h-3.5" /> Hackathon Rules
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
