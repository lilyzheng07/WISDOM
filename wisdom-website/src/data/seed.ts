import { dataService } from '../services/dataService';
import type { User, Board, Thread, Sponsor, SpotlightProfile, Event } from '../types';

function uuid(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

const NOW = new Date().toISOString();
const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

// ── Users ──────────────────────────────────────────────────────────────────
const ADMIN_ID = 'user-admin';
const DEMO_ADULT_ID = 'user-demo-adult';
const DEMO_MINOR_ID = 'user-demo-minor';

const SEED_USERS: User[] = [
  {
    id: ADMIN_ID,
    fullName: 'WISDOM Admin',
    email: 'admin@wisdom.org',
    passwordHash: 'admin123',
    age: 35,
    isMinor: false,
    role: 'admin',
    location: 'Sydney',
    disciplines: [{ category: 'Technology', subFields: ['Biotechnology'] }],
    tags: ['tag-15'],
    participationRole: 'here_to_help',
    following: [],
    recentlyVisitedBoards: [],
    notificationArea: [],
    createdAt: NOW,
  },
  {
    id: DEMO_ADULT_ID,
    fullName: 'Demo User',
    email: 'demo@wisdom.org',
    passwordHash: 'demo123',
    age: 25,
    isMinor: false,
    role: 'user',
    location: 'Sydney',
    disciplines: [
      { category: 'Engineering', subFields: ['Mechatronic', 'Electronic'] },
      { category: 'Mathematics', subFields: ['Statistics'] },
    ],
    tags: ['tag-8', 'tag-11', 'tag-13', 'tag-19'],
    participationRole: 'seeking_help',
    following: [],
    recentlyVisitedBoards: [],
    notificationArea: [],
    createdAt: NOW,
  },
  {
    id: DEMO_MINOR_ID,
    fullName: 'Demo Minor',
    email: 'demo.minor@wisdom.org',
    passwordHash: 'demo123',
    age: 16,
    isMinor: true,
    role: 'user',
    location: 'Melbourne',
    disciplines: [{ category: 'Science', subFields: ['Biology'] }],
    tags: ['tag-2', 'tag-18'],
    participationRole: 'seeking_help',
    following: [],
    recentlyVisitedBoards: [],
    notificationArea: [],
    createdAt: NOW,
  },
  // Additional professionals for the Connecting Platform
  {
    id: 'user-prof-1',
    fullName: 'Dr. Sarah Chen',
    email: 'sarah.chen@example.com',
    passwordHash: 'pass123',
    age: 32,
    isMinor: false,
    role: 'user',
    location: 'Sydney',
    disciplines: [{ category: 'Technology', subFields: ['Biotechnology'] }],
    tags: ['tag-5', 'tag-15'],
    participationRole: 'here_to_help',
    following: [],
    recentlyVisitedBoards: [],
    notificationArea: [],
    createdAt: NOW,
  },
  {
    id: 'user-prof-2',
    fullName: 'Emma Rodriguez',
    email: 'emma.r@example.com',
    passwordHash: 'pass123',
    age: 28,
    isMinor: false,
    role: 'user',
    location: 'Sydney',
    disciplines: [{ category: 'Engineering', subFields: ['Mechanical'] }],
    tags: ['tag-10', 'tag-16'],
    participationRole: 'here_to_help',
    following: [],
    recentlyVisitedBoards: [],
    notificationArea: [],
    createdAt: NOW,
  },
  {
    id: 'user-prof-3',
    fullName: 'Anika Patel',
    email: 'anika.p@example.com',
    passwordHash: 'pass123',
    age: 30,
    isMinor: false,
    role: 'user',
    location: 'Melbourne',
    disciplines: [{ category: 'Mathematics', subFields: ['Actuarial Studies'] }],
    tags: ['tag-12', 'tag-15'],
    participationRole: 'here_to_help',
    following: [],
    recentlyVisitedBoards: [],
    notificationArea: [],
    createdAt: NOW,
  },
];

// ── Spotlight Profiles ─────────────────────────────────────────────────────
const SEED_SPOTLIGHT_PROFILES: SpotlightProfile[] = [
  {
    id: 'spotlight-1',
    name: 'Dr. Aisha Nkemdirim',
    field: 'Computer Science / Quantitative Finance',
    organisation: 'Apex Capital Analytics',
    bio: 'Builds ML models for high-frequency trading strategies.',
    avatarUrl: null,
    isSeeded: true,
  },
  {
    id: 'spotlight-2',
    name: 'Priya Subramaniam',
    field: 'Mechanical Engineering',
    organisation: 'SpaceVenture Australia',
    bio: 'Designs propulsion systems for small satellite launchers.',
    avatarUrl: null,
    isSeeded: true,
  },
  {
    id: 'spotlight-3',
    name: 'Mei-Ling Zhao',
    field: 'Biotechnology',
    organisation: 'Helix Biotech',
    bio: 'Leads CRISPR research targeting rare genetic disorders.',
    avatarUrl: null,
    isSeeded: true,
  },
  {
    id: 'spotlight-4',
    name: 'Fatima Al-Rashidi',
    field: 'Mathematics / Actuarial Studies',
    organisation: 'Meridian Insurance Group',
    bio: 'Develops climate-risk actuarial models.',
    avatarUrl: null,
    isSeeded: true,
  },
  {
    id: 'spotlight-5',
    name: 'Chloe Okafor',
    field: 'Electronic Engineering',
    organisation: 'NovaMind AI',
    bio: 'Designs neuromorphic chips for edge AI inference.',
    avatarUrl: null,
    isSeeded: true,
  },
  {
    id: 'spotlight-6',
    name: 'Dr. Ingrid Svensson',
    field: 'Chemistry / Research Sciences',
    organisation: 'University of Melbourne',
    bio: 'Researches sustainable polymer synthesis.',
    avatarUrl: null,
    isSeeded: true,
  },
];

// ── Sponsors ───────────────────────────────────────────────────────────────
const SEED_SPONSORS: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'NovaMind AI',
    tagline: 'Empowering the next generation of women in artificial intelligence and machine learning.',
    logoUrl: null,
    isActive: true,
    isSeeded: true,
    createdAt: NOW,
  },
  {
    id: 'sponsor-2',
    name: 'Apex Engineering Group',
    tagline: 'Building a more inclusive future in civil and structural engineering.',
    logoUrl: null,
    isActive: true,
    isSeeded: true,
    createdAt: NOW,
  },
  {
    id: 'sponsor-3',
    name: 'Meridian University Institute for STEM Equity',
    tagline: 'Advancing research and opportunity for women across all STEM disciplines.',
    logoUrl: null,
    isActive: true,
    isSeeded: true,
    createdAt: NOW,
  },
  {
    id: 'sponsor-4',
    name: 'Women in STEM Foundation',
    tagline: 'A professional association dedicated to connecting, mentoring, and championing women in science and technology.',
    logoUrl: null,
    isActive: true,
    isSeeded: true,
    createdAt: NOW,
  },
  {
    id: 'sponsor-5',
    name: 'Helix Biotech',
    tagline: 'Pioneering life sciences innovation with a commitment to diversity in research.',
    logoUrl: null,
    isActive: true,
    isSeeded: true,
    createdAt: NOW,
  },
];

// ── Boards ─────────────────────────────────────────────────────────────────
const SEED_BOARDS: Board[] = [
  { id: 'board-1', name: 'Biology Q&A', description: 'Discuss biology research, studies, and career paths.', category: 'Science', threadCount: 3, lastActivityAt: NOW, createdAt: NOW },
  { id: 'board-2', name: 'Chemistry Lab', description: 'Share chemistry experiments, questions, and discoveries.', category: 'Science', threadCount: 3, lastActivityAt: NOW, createdAt: NOW },
  { id: 'board-3', name: 'Mechatronic Minds', description: 'Mechatronics engineering discussions and project help.', category: 'Engineering', threadCount: 3, lastActivityAt: NOW, createdAt: NOW },
  { id: 'board-4', name: 'Electronic Engineering Hub', description: 'Electronics, circuits, and embedded systems.', category: 'Engineering', threadCount: 3, lastActivityAt: NOW, createdAt: NOW },
  { id: 'board-5', name: 'Actuarial Corner', description: 'Actuarial studies, exams, and career advice.', category: 'Mathematics', threadCount: 3, lastActivityAt: NOW, createdAt: NOW },
  { id: 'board-6', name: 'Statistics & Data', description: 'Statistics, data science, and mathematical modelling.', category: 'Mathematics', threadCount: 3, lastActivityAt: NOW, createdAt: NOW },
  { id: 'board-7', name: 'Biotechnology Frontiers', description: 'Cutting-edge biotech research and industry news.', category: 'Technology', threadCount: 3, lastActivityAt: NOW, createdAt: NOW },
  { id: 'board-8', name: 'Research Sciences Forum', description: 'General research sciences discussion and methodology.', category: 'Science', threadCount: 3, lastActivityAt: NOW, createdAt: NOW },
];

// ── Threads ────────────────────────────────────────────────────────────────
function makeThreads(boardId: string, titles: [string, string, string], scores: [number, number, number]): Thread[] {
  return titles.map((title, i) => ({
    id: `thread-${boardId}-${i + 1}`,
    boardId,
    authorId: DEMO_ADULT_ID,
    title,
    detailQuestions: 'What are your thoughts on this topic?',
    description: `A discussion about ${title.toLowerCase()}. Share your experiences and insights with the community.`,
    tags: [],
    status: 'published' as const,
    isAdultOnly: false,
    replyCount: scores[i],
    engagementScore: scores[i] * 10,
    createdAt: YESTERDAY,
    updatedAt: NOW,
  }));
}

const SEED_THREADS: Thread[] = [
  ...makeThreads('board-1', ['Getting started with cell biology research', 'Best resources for genetics study', 'Career paths in marine biology'], [12, 8, 15]),
  ...makeThreads('board-2', ['Organic chemistry study tips', 'Lab safety best practices', 'Green chemistry innovations'], [9, 6, 11]),
  ...makeThreads('board-3', ['Intro to PLC programming', 'Robotics project ideas for beginners', 'Sensor fusion techniques'], [14, 7, 10]),
  ...makeThreads('board-4', ['PCB design tools comparison', 'Getting into embedded systems', 'Signal processing fundamentals'], [5, 13, 8]),
  ...makeThreads('board-5', ['Actuarial exam study schedule', 'Climate risk modelling approaches', 'Career in insurance vs consulting'], [11, 9, 6]),
  ...makeThreads('board-6', ['R vs Python for statistics', 'Bayesian methods explained', 'Data visualisation best practices'], [16, 12, 7]),
  ...makeThreads('board-7', ['CRISPR applications in medicine', 'Biotech startup landscape in Australia', 'Synthetic biology career paths'], [10, 8, 14]),
  ...makeThreads('board-8', ['Writing your first research paper', 'Choosing a research supervisor', 'Interdisciplinary research opportunities'], [7, 11, 9]),
];

// ── Events ─────────────────────────────────────────────────────────────────
const FUTURE_DATE_1 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const FUTURE_DATE_2 = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const FUTURE_DATE_3 = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const SEED_EVENTS: Event[] = [
  {
    id: 'event-1',
    title: 'STEM Women Networking Night — Sydney',
    type: 'Networking',
    date: FUTURE_DATE_1,
    time: '18:00',
    location: 'Sydney',
    description: 'An evening of networking for women in STEM. Meet peers, mentors, and industry leaders.',
    organiserId: ADMIN_ID,
    createdAt: NOW,
  },
  {
    id: 'event-2',
    title: 'Biotech Industry Catchup',
    type: 'Catchup',
    date: FUTURE_DATE_2,
    time: '12:00',
    location: 'Sydney',
    description: 'Informal catchup for biotech professionals and students in Sydney.',
    organiserId: ADMIN_ID,
    createdAt: NOW,
  },
  {
    id: 'event-3',
    title: 'Engineering Internship Fair',
    type: 'Internship Opportunity',
    date: FUTURE_DATE_3,
    time: '10:00',
    location: 'Melbourne',
    description: 'Connect with top engineering firms offering internship opportunities for women in STEM.',
    organiserId: ADMIN_ID,
    createdAt: NOW,
  },
  {
    id: 'event-4',
    title: 'Mentorship Program Launch',
    type: 'Mentorship Opportunity',
    date: FUTURE_DATE_2,
    time: '14:00',
    location: 'Sydney',
    description: 'Launch event for the WISDOM mentorship program. Meet your potential mentors.',
    organiserId: ADMIN_ID,
    createdAt: NOW,
  },
];

// ── Main seed function ─────────────────────────────────────────────────────
export function seedData(): void {
  if (dataService.isSeeded()) return;

  dataService.setUsers(SEED_USERS);
  dataService.setSpotlightProfiles(SEED_SPOTLIGHT_PROFILES);
  dataService.setSponsors(SEED_SPONSORS);
  dataService.setBoards(SEED_BOARDS);
  dataService.setThreads(SEED_THREADS);
  dataService.setEvents(SEED_EVENTS);
  dataService.setSettings({ contactFormUrl: '', sponsorFormUrl: '' });

  dataService.markSeeded();
}

// Export the unused uuid helper to avoid lint warnings while keeping it available
export { uuid };
