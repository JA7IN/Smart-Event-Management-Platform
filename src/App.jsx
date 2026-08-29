'use client';

import React, { useState } from 'react';
import { EventProvider, useEventContext } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { NotificationToast } from './components/NotificationToast';
import { QRScannerModal } from './components/QRScannerModal';
import { CheckinView } from './views/CheckinView';
import { TeamFormationView } from './views/TeamFormationView';
import { SubmissionsView } from './views/SubmissionsView';
import { LeaderboardView } from './views/LeaderboardView';

const MainContent = ({ onOpenScanner }) => {
  const { currentView } = useEventContext();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {currentView === 'checkin' && <CheckinView />}
      {currentView === 'team' && <TeamFormationView />}
      {currentView === 'submissions' && <SubmissionsView />}
      {currentView === 'leaderboard' && <LeaderboardView />}
    </main>
  );
};

export default function App() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <EventProvider>
      <div className="min-h-screen flex flex-col bg-[#05070f] text-gray-100 selection:bg-indigo-500 selection:text-white">
        
        {/* Navigation Bar */}
        <Navbar onOpenScanner={() => setShowScanner(true)} />

        {/* Dynamic Route View */}
        <div className="flex-grow">
          <MainContent onOpenScanner={() => setShowScanner(true)} />
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6 text-center text-xs text-gray-500 bg-[#04060b]/60">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>⚡ HackPulse OS • Powered by Hack2Skill Portals</span>
            <span>Single-Dashboard Next.js &amp; Tailwind CSS Web App</span>
          </div>
        </footer>

        {/* Toast Notifier */}
        <NotificationToast />

        {/* QR Scanner Station Modal */}
        {showScanner && (
          <QRScannerModal onClose={() => setShowScanner(false)} />
        )}

      </div>
    </EventProvider>
  );
}
