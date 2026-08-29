# Smart Event Management Platform (SEMP)

A unified, real-time dashboard consolidating the end-to-end event lifecycle (admissions, matchmaking, announcements, evaluation rubrics, and standings) into a single highly responsive application. Built strictly to stay within the $<10\text{ MB}$ repository payload limit.

---

## ⚡ Live Deployments

- **Production Live URL**: [https://smart-event-platform-gilt.vercel.app](https://smart-event-platform-gilt.vercel.app)
- **Source Code Repository**: [https://github.com/JA7IN/Smart-Event-Management-Platform](https://github.com/JA7IN/Smart-Event-Management-Platform)

---

## 🛠️ Main Tech Stack
- **Framework**: React + Vite (Fast compilation, lightweight footprint)
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **QR Codes**: `qrcode.react` (client-side render)

---

## ⚖️ Evaluation Parameter Alignments

1. **Code Quality**: Raw mock databases are isolated in [mockData.js](src/data/mockData.js), keeping [App.jsx](src/App.jsx) clean and self-documenting.
2. **Security**: Sanitization helpers automatically strip HTML tag vectors (XSS protection) and reject malicious URL schemas on submission inputs.
3. **Efficiency**: Memoized leaderboard standing maps and evaluation test logs using `useMemo` hooks to avoid re-render overhead.
4. **Testing**: Built a client-side unit test runner tab inside the UI, validating check-in boundaries and rubric aggregation ranges live in the browser.
5. **Accessibility**: WAI-ARIA description tags and semantic HTML structuring applied across all inputs, buttons, and navigation elements.
6. **Problem Statement Alignment**: Fulfills all 5 modules from the PDF problem statement (QR Pass, Team Finder, Announcement feeds, Sliders, Leaderboards) in a single-page state machine.

---

## 🚀 How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local dev server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
