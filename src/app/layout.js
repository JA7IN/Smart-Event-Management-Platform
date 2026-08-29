import './globals.css';

export const metadata = {
  title: 'Smart Event Platform - Unified Dashboard',
  description: 'Unified Next.js/Tailwind CSS responsive dashboard inspired by Hack2Skill hackathon portals.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
      </head>
      <body className="antialiased min-h-screen text-gray-100 bg-[#090d16]">
        {children}
      </body>
    </html>
  );
}
