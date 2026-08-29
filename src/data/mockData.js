export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: '🚀 Hackathon Kickoff & Keynote!',
    message: 'Welcome all participants! Opening ceremony begins in Main Auditorium & live stream.',
    category: 'General',
    timestamp: '10:00 AM',
    priority: 'high'
  },
  {
    id: 'ann-2',
    title: '🍔 Lunch & Refreshments Open',
    message: 'Food court is open for badges with active QR check-in status. Enjoy your meal!',
    category: 'Venue',
    timestamp: '01:00 PM',
    priority: 'medium'
  },
  {
    id: 'ann-3',
    title: '⏰ Project Submission Deadline Reminder',
    message: 'Submissions close at 04:00 PM. Make sure your GitHub repo link and video demo are uploaded.',
    category: 'Schedule',
    timestamp: '02:30 PM',
    priority: 'emergency'
  }
];

export const INITIAL_PARTICIPANTS = [
  {
    id: 'PART-101',
    name: 'Alex Rivera',
    email: 'alex.rivera@techfest.org',
    role: 'Full-Stack Developer',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    bio: 'Passionate about building scalable event tech & real-time dashboards.',
    teamId: 'TEAM-01',
    checkInStatus: true,
    checkInTime: '09:15 AM',
    lookingForTeam: false,
    qrCodeValue: 'QR-PASS-PART-101-ALEX'
  },
  {
    id: 'PART-102',
    name: 'Sophia Chen',
    email: 'sophia.chen@ai-innovators.io',
    role: 'AI / ML Engineer',
    skills: ['Python', 'PyTorch', 'FastAPI', 'LLMs'],
    bio: 'Specializing in computer vision and natural language processing agents.',
    teamId: 'TEAM-01',
    checkInStatus: true,
    checkInTime: '09:30 AM',
    lookingForTeam: false,
    qrCodeValue: 'QR-PASS-PART-102-SOPHIA'
  },
  {
    id: 'PART-103',
    name: 'Marcus Vance',
    email: 'marcus.vance@designops.co',
    role: 'UI/UX Designer',
    skills: ['Figma', 'Design Systems', 'UI Animation', 'CSS'],
    bio: 'Crafting pixel-perfect glassmorphic user interfaces and micro-interactions.',
    teamId: 'TEAM-01',
    checkInStatus: true,
    checkInTime: '09:45 AM',
    lookingForTeam: false,
    qrCodeValue: 'QR-PASS-PART-103-MARCUS'
  },
  {
    id: 'PART-104',
    name: 'Elena Rostova',
    email: 'elena.rostova@cybersec.net',
    role: 'Backend & DevOps',
    skills: ['Go', 'Docker', 'Kubernetes', 'Redis'],
    bio: 'Building resilient cloud infrastructure and high-throughput APIs.',
    teamId: 'TEAM-02',
    checkInStatus: true,
    checkInTime: '10:05 AM',
    lookingForTeam: false,
    qrCodeValue: 'QR-PASS-PART-104-ELENA'
  },
  {
    id: 'PART-105',
    name: 'David Kim',
    email: 'david.kim@web3dev.org',
    role: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Web3.js', 'Next.js'],
    bio: 'Frontend enthusiast working on decentralized social applications.',
    teamId: 'TEAM-02',
    checkInStatus: false,
    checkInTime: null,
    lookingForTeam: false,
    qrCodeValue: 'QR-PASS-PART-105-DAVID'
  },
  {
    id: 'PART-106',
    name: 'Priyah Sharma',
    email: 'priyah.sharma@aiml.ai',
    role: 'Data Scientist',
    skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-Learn'],
    bio: 'Predictive analytics & real-time recommendation algorithms.',
    teamId: null,
    checkInStatus: true,
    checkInTime: '11:12 AM',
    lookingForTeam: true,
    qrCodeValue: 'QR-PASS-PART-106-PRIYAH'
  },
  {
    id: 'PART-107',
    name: 'Lucas Thorne',
    email: 'lucas.thorne@mobilelabs.com',
    role: 'Mobile Dev',
    skills: ['Flutter', 'React Native', 'Firebase', 'Swift'],
    bio: 'Cross-platform mobile applications specialist looking for a backend co-founder.',
    teamId: null,
    checkInStatus: true,
    checkInTime: '11:40 AM',
    lookingForTeam: true,
    qrCodeValue: 'QR-PASS-PART-107-LUCAS'
  },
  {
    id: 'PART-108',
    name: 'Zoe Martinez',
    email: 'zoe.martinez@cloudnet.io',
    role: 'Cloud Engineer',
    skills: ['AWS', 'Terraform', 'Serverless', 'Node.js'],
    bio: 'Automating continuous deployment pipelines and serverless backend setups.',
    teamId: null,
    checkInStatus: false,
    checkInTime: null,
    lookingForTeam: true,
    qrCodeValue: 'QR-PASS-PART-108-ZOE'
  }
];

export const INITIAL_TEAMS = [
  {
    id: 'TEAM-01',
    name: 'NeuralPulse',
    track: 'AI / ML',
    tagline: 'Real-time AI voice summary assistant for interactive events.',
    repoUrl: 'https://github.com/neuralpulse/event-voice-ai',
    demoUrl: 'https://youtube.com/watch?v=neuralpulse-demo',
    members: ['PART-101', 'PART-102', 'PART-103'],
    submissionStatus: 'Submitted',
    submissionTime: '02:15 PM'
  },
  {
    id: 'TEAM-02',
    name: 'CyberShield',
    track: 'Open Innovation',
    tagline: 'Zero-trust decentralized attendee identity & badge verification.',
    repoUrl: 'https://github.com/cybershield/decentralized-badge',
    demoUrl: 'https://youtube.com/watch?v=cybershield-demo',
    members: ['PART-104', 'PART-105'],
    submissionStatus: 'Submitted',
    submissionTime: '02:40 PM'
  },
  {
    id: 'TEAM-03',
    name: 'EcoTrack AI',
    track: 'Sustainability',
    tagline: 'Smart event carbon footprint monitor using IoT sensor feeds.',
    repoUrl: 'https://github.com/ecotrack/event-sustainability',
    demoUrl: 'https://youtube.com/watch?v=ecotrack-demo',
    members: ['PART-106'],
    submissionStatus: 'Draft',
    submissionTime: null
  }
];

export const INITIAL_JUDGES = [
  {
    id: 'JUDGE-01',
    name: 'Dr. Aris Thorne',
    title: 'VP of AI Research at TechCorp',
    expertise: ['AI / ML', 'Cloud Systems'],
    assignedTeams: ['TEAM-01', 'TEAM-02', 'TEAM-03']
  },
  {
    id: 'JUDGE-02',
    name: 'Maya Lin',
    title: 'Principal Product Designer',
    expertise: ['UI/UX', 'Product Design'],
    assignedTeams: ['TEAM-01', 'TEAM-02', 'TEAM-03']
  }
];

export const RUBRIC_CRITERIA = [
  { id: 'innovation', name: 'Innovation & Originality', weight: 0.25, maxScore: 10, description: 'Uniqueness of idea and creative problem-solving.' },
  { id: 'execution', name: 'Technical Execution', weight: 0.25, maxScore: 10, description: 'Code quality, architecture, performance, and functionality.' },
  { id: 'design', name: 'UI / UX & Experience', weight: 0.25, maxScore: 10, description: 'Design aesthetics, user flow, responsive layouts & polish.' },
  { id: 'pitch', name: 'Pitch & Presentation', weight: 0.25, maxScore: 10, description: 'Clarity of problem statement, demo quality & completeness.' }
];

export const INITIAL_SCORES = [
  {
    judgeId: 'JUDGE-01',
    teamId: 'TEAM-01',
    rubricScores: { innovation: 9.5, execution: 9.0, design: 9.2, pitch: 9.0 },
    feedback: 'Exceptional AI speech parsing model and crisp architecture! Very impressed by the latency.',
    submittedAt: '03:10 PM'
  },
  {
    judgeId: 'JUDGE-02',
    teamId: 'TEAM-01',
    rubricScores: { innovation: 9.0, execution: 8.8, design: 9.8, pitch: 9.5 },
    feedback: 'Stunning visual interface with glassmorphism design. Micro-interactions were smooth.',
    submittedAt: '03:25 PM'
  },
  {
    judgeId: 'JUDGE-01',
    teamId: 'TEAM-02',
    rubricScores: { innovation: 8.5, execution: 9.5, design: 8.0, pitch: 8.5 },
    feedback: 'Robust cryptographic implementation. Outstanding security posture.',
    submittedAt: '03:30 PM'
  }
];
