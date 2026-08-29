'use client';

import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, CheckCircle2, ShieldAlert, Sparkles, UserCheck, Search, Users } from 'lucide-react';

export const CheckinView = () => {
  const { 
    activeParticipant, 
    activeParticipantTeam, 
    participants, 
    checkInParticipant,
    stats
  } = useEventContext();

  const [qrInput, setQrInput] = useState('');
  const [lastScanned, setLastScanned] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!qrInput.trim()) return;
    const success = checkInParticipant(qrInput.trim());
    if (success) {
      const found = participants.find(p => p.id === qrInput || p.qrCodeValue === qrInput);
      setLastScanned(found || { name: qrInput });
      setQrInput('');
    }
  };

  const handleQuickCheckin = (p) => {
    const success = checkInParticipant(p.id);
    if (success) {
      setLastScanned(p);
    }
  };

  const uncheckedList = participants.filter(p => !p.checkInStatus);
  const checkInPercentage = Math.round((stats.totalCheckedIn / (stats.totalRegistered || 1)) * 100);

  const filteredParticipants = participants.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.role.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-fadeIn text-xs">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Verification Hub
            </span>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Check-in / QR
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white font-heading">
            QR Event Badge & Admission Desk
          </h2>
          <p className="text-gray-400 mt-1">
            Inspect digital passes, run simulated scanner modules, and verify attendee registrations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: QR Generator Card */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <QrCode className="w-4 h-4 text-indigo-400" /> Digital Ticket Pass
            </h3>
            <p className="text-gray-400">
              Your unique event pass token ready to scan at the admission desk.
            </p>

            <div className="bg-gradient-to-b from-slate-900 to-[#070a14] border border-white/5 rounded-xl p-5 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex justify-between items-start mb-4 gap-3">
                <div>
                  <span className="bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1">
                    Attendee Pass
                  </span>
                  <h4 className="text-sm font-extrabold text-white leading-tight">{activeParticipant?.name}</h4>
                  <p className="text-[10px] text-indigo-300 font-medium mt-0.5">{activeParticipant?.role}</p>
                </div>
                {activeParticipant?.checkInStatus ? (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Active
                  </span>
                ) : (
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 animate-pulse">
                    <ShieldAlert className="w-2.5 h-2.5" /> Pending
                  </span>
                )}
              </div>

              {/* QR Render */}
              <div className="bg-white p-3.5 rounded-xl inline-block shadow-inner mb-4 border border-indigo-500/25 mx-auto block w-fit">
                <QRCodeSVG 
                  value={activeParticipant?.qrCodeValue || 'PASS-TOKEN'} 
                  size={150} 
                  level="H" 
                  includeMargin={false}
                />
              </div>

              <div className="text-[10px] text-gray-400 space-y-1">
                <p className="font-mono text-[9px] text-gray-300 bg-[#05070f] py-1 px-3 rounded border border-white/5 text-center">
                  Token: {activeParticipant?.qrCodeValue}
                </p>
                <p className="pt-2 text-center">
                  Squad: <strong className="text-gray-200">{activeParticipantTeam ? activeParticipantTeam.name : 'Solo Hackathoner'}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Scanner Simulation */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-400" /> Scanner Simulation Box
            </h3>
            <p className="text-gray-400">
              Type or select a badge ID to trigger simulated scan checks.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-center space-y-4">
              <div className="w-full h-24 bg-[#05070f] rounded-lg border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 animate-pulse"></div>
                <Sparkles className="w-6 h-6 text-emerald-400 mb-1.5 animate-bounce" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Scanner Aimed</span>
              </div>

              <form onSubmit={handleScanSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste QR-PASS token..."
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="flex-grow bg-[#05070f] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-indigo-500 transition-all font-mono"
                />
                <button type="submit" className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-gray-950 font-bold hover:bg-emerald-400 text-xs">
                  Verify
                </button>
              </form>
            </div>

            {lastScanned && (
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl flex items-center justify-between">
                <span className="text-[10px] text-emerald-300">Scanned: <strong>{lastScanned.name}</strong></span>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-300 uppercase tracking-wider">Approved</span>
              </div>
            )}

            {/* Quick scan buttons */}
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Pending Scans ({uncheckedList.length})</span>
              <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                {uncheckedList.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleQuickCheckin(p)}
                    className="flex justify-between items-center p-2 rounded bg-slate-900 border border-white/5 hover:border-emerald-500/30 cursor-pointer text-[10px]"
                  >
                    <span className="text-gray-300">{p.name}</span>
                    <span className="text-gray-500 font-mono">{p.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Registry List */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" /> Check-in Registry
              </h3>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                {checkInPercentage}% Verified
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Search registry name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#05070f] border border-white/5 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredParticipants.map(p => (
                <div key={p.id} className="p-3 bg-[#05070f] border border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-200">{p.name}</h4>
                    <p className="text-[9px] text-gray-500 mt-0.5">{p.role}</p>
                  </div>

                  {p.checkInStatus ? (
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                      Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => checkInParticipant(p.id)}
                      className="px-2.5 py-1 text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-all"
                    >
                      Verify
                    </button>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
