'use client';

import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import { X, QrCode, CheckCircle2, Search, UserCheck, Sparkles } from 'lucide-react';

export const QRScannerModal = ({ onClose }) => {
  const { participants, checkInParticipant } = useEventContext();
  const [qrInput, setQrInput] = useState('');
  const [lastScanned, setLastScanned] = useState(null);

  const handleScanSubmit = (e) => {
    e?.preventDefault();
    if (!qrInput.trim()) return;

    const success = checkInParticipant(qrInput.trim());
    if (success) {
      const found = participants.find(p => p.id === qrInput || p.qrCodeValue === qrInput);
      setLastScanned(found || { name: qrInput });
      setQrInput('');
    }
  };

  const handleQuickCheckin = (participant) => {
    const success = checkInParticipant(participant.id);
    if (success) {
      setLastScanned(participant);
    }
  };

  const uncheckedList = participants.filter(p => !p.checkInStatus);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-white/5 rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-slideUp text-xs">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-lg bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-heading">QR Pass Verification Station</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">Verify attendee tickets using mock scan selectors</p>
          </div>
        </div>

        {/* Live scanner box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-white/5 mb-5 text-center">
          <div className="relative max-w-xs mx-auto mb-3">
            <div className="w-full h-24 bg-[#05070f] rounded-lg border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center p-3 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 animate-pulse"></div>
              <Sparkles className="w-6 h-6 text-emerald-400 mb-1.5 animate-bounce" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Scanner Online</span>
            </div>
          </div>

          <form onSubmit={handleScanSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Paste QR-PASS token or ID..."
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              className="flex-grow bg-[#05070f] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-indigo-500 transition-all font-mono"
            />
            <button type="submit" className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-gray-950 font-bold hover:bg-emerald-400 text-xs">
              Verify
            </button>
          </form>
        </div>

        {/* Checked-in feedback badge */}
        {lastScanned && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl flex items-center justify-between mb-5">
            <span className="text-[10px] text-emerald-300">Verified access: <strong>{lastScanned.name}</strong></span>
            <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-300 uppercase tracking-wider">Pass Valid</span>
          </div>
        )}

        {/* Quick simulator scan list */}
        <div>
          <div className="flex justify-between items-center mb-2 text-[10px]">
            <span className="font-bold text-gray-400 uppercase tracking-wider">Pending Attendees ({uncheckedList.length})</span>
            <span className="text-gray-500">Tap to mock scan</span>
          </div>

          {uncheckedList.length === 0 ? (
            <div className="text-center py-5 text-emerald-400 bg-emerald-950/10 rounded-xl border border-emerald-500/20">
              🎉 100% attendee check-in ratio achieved!
            </div>
          ) : (
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {uncheckedList.map(p => (
                <div
                  key={p.id}
                  onClick={() => handleQuickCheckin(p)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-emerald-500/30 cursor-pointer transition-all"
                >
                  <div>
                    <div className="font-bold text-gray-200">{p.name}</div>
                    <div className="text-[9px] text-gray-500 mt-0.5">{p.role} • <strong className="font-mono text-gray-400">{p.id}</strong></div>
                  </div>
                  <button className="px-2 py-1 rounded bg-white/5 hover:bg-emerald-500 hover:text-gray-950 text-gray-400 transition-all font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                    <UserCheck className="w-2.5 h-2.5" /> Scan
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
