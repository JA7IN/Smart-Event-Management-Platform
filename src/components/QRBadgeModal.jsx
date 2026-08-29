'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export const QRBadgeModal = ({ participant, team, onClose }) => {
  if (!participant) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-white/5 rounded-2xl max-w-sm w-full p-6 relative text-center shadow-2xl animate-slideUp text-xs">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-lg bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-3 border border-indigo-500/20">
          <Sparkles className="w-5 h-5" />
        </div>

        <h3 className="text-base font-bold text-white font-heading">Digital Ticket Pass</h3>
        <p className="text-[10px] text-gray-400 mb-6">Scan QR code at event entrances to check-in</p>

        {/* Badge Card Visual */}
        <div className="bg-gradient-to-b from-slate-900 to-[#070a14] border border-white/5 rounded-xl p-5 shadow-inner relative overflow-hidden text-left">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex justify-between items-start mb-4 gap-3">
            <div>
              <span className="bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1">
                Attendee Pass
              </span>
              <h4 className="text-sm font-extrabold text-white leading-tight">{participant.name}</h4>
              <p className="text-[10px] text-indigo-300 font-medium mt-0.5">{participant.role}</p>
            </div>
            {participant.checkInStatus ? (
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> Active
              </span>
            ) : (
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 animate-pulse">
                <ShieldAlert className="w-2.5 h-2.5" /> Pending
              </span>
            )}
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-3.5 rounded-xl inline-block shadow-inner mb-4 border border-indigo-500/25 mx-auto block w-fit">
            <QRCodeSVG 
              value={participant.qrCodeValue} 
              size={150} 
              level="H" 
              includeMargin={false}
            />
          </div>

          <div className="text-[10px] text-gray-400 space-y-1">
            <p className="font-mono text-[9px] text-gray-300 bg-[#05070f] py-1 px-3 rounded border border-white/5 text-center">
              Token: {participant.qrCodeValue}
            </p>
            <p className="pt-2 text-center">
              Squad: <strong className="text-gray-200">{team ? team.name : 'Solo Hackathoner'}</strong>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button 
            onClick={onClose} 
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold border border-white/5 transition-all text-xs"
          >
            Close Pass
          </button>
        </div>

      </div>
    </div>
  );
};
