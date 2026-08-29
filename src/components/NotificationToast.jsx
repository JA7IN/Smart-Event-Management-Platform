'use client';

import React from 'react';
import { useEventContext } from '../context/EventContext';
import { Bell, CheckCircle2, AlertTriangle, Info, AlertOctagon, X } from 'lucide-react';

export const NotificationToast = () => {
  const { toastNotifications, removeNotification } = useEventContext();

  if (toastNotifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toastNotifications.map(toast => {
        let Icon = Info;
        let borderClass = 'border-indigo-500/30';
        let bgClass = 'bg-indigo-950/95';
        let iconColor = 'text-indigo-400';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderClass = 'border-emerald-500/30';
          bgClass = 'bg-emerald-950/95';
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-amber-500/30';
          bgClass = 'bg-amber-950/95';
          iconColor = 'text-amber-400';
        } else if (toast.type === 'emergency' || toast.type === 'error') {
          Icon = AlertOctagon;
          borderClass = 'border-rose-500/40';
          bgClass = 'bg-rose-950/95';
          iconColor = 'text-rose-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${borderClass} ${bgClass} backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slideUp`}
          >
            <Icon className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0 text-xs">
              <h4 className="text-xs font-bold text-white truncate leading-none">{toast.title}</h4>
              <p className="text-[10px] text-gray-300 mt-1.5 leading-relaxed">{toast.message}</p>
              <span className="text-[9px] text-gray-500 mt-1 block font-mono">{toast.timestamp}</span>
            </div>
            <button
              onClick={() => removeNotification(toast.id)}
              className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors bg-white/5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
