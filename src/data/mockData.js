export const INITIAL_PARTICIPANTS = [
  { id: 'PART-101', name: 'Alex Rivera', role: 'Frontend Engineer', skills: ['React', 'TypeScript', 'Tailwind'], checkInStatus: true, checkInTime: '09:15 AM', lookingForTeam: false, qrValue: 'QR-ALEX-101', teamId: 'TEAM-01' },
  { id: 'PART-102', name: 'Sophia Chen', role: 'AI Developer', skills: ['Python', 'PyTorch', 'FastAPI'], checkInStatus: true, checkInTime: '09:30 AM', lookingForTeam: false, qrValue: 'QR-SOPHIA-102', teamId: 'TEAM-01' },
  { id: 'PART-103', name: 'Marcus Vance', role: 'UI/UX Designer', skills: ['Figma', 'CSS', 'UI Animation'], checkInStatus: false, checkInTime: null, lookingForTeam: true, qrValue: 'QR-MARCUS-103', teamId: null },
  { id: 'PART-104', name: 'Elena Rostova', role: 'Backend Dev', skills: ['Go', 'Docker', 'Kubernetes'], checkInStatus: true, checkInTime: '10:05 AM', lookingForTeam: false, qrValue: 'QR-ELENA-104', teamId: 'TEAM-02' },
  { id: 'PART-105', name: 'David Kim', role: 'DevOps Lead', skills: ['AWS', 'Terraform', 'CI/CD'], checkInStatus: false, checkInTime: null, lookingForTeam: true, qrValue: 'QR-DAVID-105', teamId: null }
];

export const INITIAL_TEAMS = [
  { id: 'TEAM-01', name: 'NeuralPulse AI', track: 'AI / ML', tagline: 'Real-time agentic voice parsing pipeline.', repoUrl: 'https://github.com/neuralpulse/mesh', demoUrl: 'https://youtube.com/watch?v=np-demo', members: ['PART-101', 'PART-102'], submissionStatus: 'Submitted' },
  { id: 'TEAM-02', name: 'CyberShield', track: 'Open Innovation', tagline: 'Decentralized identity badge credentials.', repoUrl: '', demoUrl: '', members: ['PART-104'], submissionStatus: 'Draft' }
];

export const INITIAL_BROADCASTS = [
  { id: 1, category: 'Schedule', time: '14:30 IST', title: 'Submission Portal Live', text: 'Deliverable forms are open in the Submissions tab.' },
  { id: 2, category: 'Venue', time: '15:00 IST', title: 'Lunch Tokens Checked', text: 'Food court is open for checked-in attendees.' }
];

export const INITIAL_SCORES = [
  { teamId: 'TEAM-01', judgeId: 'JUDGE-01', rubrics: { innovation: 9, execution: 8.5, design: 9.5, pitch: 9 }, feedback: 'Outstanding client experience & fluid animations.' }
];
