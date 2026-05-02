import type {
  User, Board, Thread, Reply, Connection, AdviceQuestion,
  Event, Enquiry, Sponsor, SpotlightProfile, Notification, PlatformSettings
} from '../types';

const KEYS = {
  users: 'wisdom_users',
  boards: 'wisdom_boards',
  threads: 'wisdom_threads',
  replies: 'wisdom_replies',
  connections: 'wisdom_connections',
  adviceQuestions: 'wisdom_advice_questions',
  events: 'wisdom_events',
  enquiries: 'wisdom_enquiries',
  sponsors: 'wisdom_sponsors',
  spotlightProfiles: 'wisdom_spotlight_profiles',
  settings: 'wisdom_settings',
  seeded: 'wisdom_seeded',
} as const;

function getAll<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function setAll<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function getOne<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function setOne<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export const dataService = {
  // Users
  getUsers: () => getAll<User>(KEYS.users),
  setUsers: (users: User[]) => setAll(KEYS.users, users),
  getUserById: (id: string) => getAll<User>(KEYS.users).find(u => u.id === id) ?? null,
  upsertUser: (user: User) => {
    const users = getAll<User>(KEYS.users);
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) users[idx] = user; else users.push(user);
    setAll(KEYS.users, users);
  },

  // Boards
  getBoards: () => getAll<Board>(KEYS.boards),
  setBoards: (boards: Board[]) => setAll(KEYS.boards, boards),
  getBoardById: (id: string) => getAll<Board>(KEYS.boards).find(b => b.id === id) ?? null,
  upsertBoard: (board: Board) => {
    const boards = getAll<Board>(KEYS.boards);
    const idx = boards.findIndex(b => b.id === board.id);
    if (idx >= 0) boards[idx] = board; else boards.push(board);
    setAll(KEYS.boards, boards);
  },

  // Threads
  getThreads: () => getAll<Thread>(KEYS.threads),
  setThreads: (threads: Thread[]) => setAll(KEYS.threads, threads),
  getThreadById: (id: string) => getAll<Thread>(KEYS.threads).find(t => t.id === id) ?? null,
  upsertThread: (thread: Thread) => {
    const threads = getAll<Thread>(KEYS.threads);
    const idx = threads.findIndex(t => t.id === thread.id);
    if (idx >= 0) threads[idx] = thread; else threads.push(thread);
    setAll(KEYS.threads, threads);
  },

  // Replies
  getReplies: () => getAll<Reply>(KEYS.replies),
  setReplies: (replies: Reply[]) => setAll(KEYS.replies, replies),
  addReply: (reply: Reply) => {
    const replies = getAll<Reply>(KEYS.replies);
    replies.push(reply);
    setAll(KEYS.replies, replies);
  },

  // Connections
  getConnections: () => getAll<Connection>(KEYS.connections),
  setConnections: (connections: Connection[]) => setAll(KEYS.connections, connections),
  upsertConnection: (connection: Connection) => {
    const connections = getAll<Connection>(KEYS.connections);
    const idx = connections.findIndex(c => c.id === connection.id);
    if (idx >= 0) connections[idx] = connection; else connections.push(connection);
    setAll(KEYS.connections, connections);
  },

  // Advice Questions
  getAdviceQuestions: () => getAll<AdviceQuestion>(KEYS.adviceQuestions),
  addAdviceQuestion: (q: AdviceQuestion) => {
    const questions = getAll<AdviceQuestion>(KEYS.adviceQuestions);
    questions.push(q);
    setAll(KEYS.adviceQuestions, questions);
  },

  // Events
  getEvents: () => getAll<Event>(KEYS.events),
  setEvents: (events: Event[]) => setAll(KEYS.events, events),
  addEvent: (event: Event) => {
    const events = getAll<Event>(KEYS.events);
    events.push(event);
    setAll(KEYS.events, events);
  },

  // Enquiries
  getEnquiries: () => getAll<Enquiry>(KEYS.enquiries),
  setEnquiries: (enquiries: Enquiry[]) => setAll(KEYS.enquiries, enquiries),
  upsertEnquiry: (enquiry: Enquiry) => {
    const enquiries = getAll<Enquiry>(KEYS.enquiries);
    const idx = enquiries.findIndex(e => e.id === enquiry.id);
    if (idx >= 0) enquiries[idx] = enquiry; else enquiries.push(enquiry);
    setAll(KEYS.enquiries, enquiries);
  },

  // Sponsors
  getSponsors: () => getAll<Sponsor>(KEYS.sponsors),
  setSponsors: (sponsors: Sponsor[]) => setAll(KEYS.sponsors, sponsors),
  upsertSponsor: (sponsor: Sponsor) => {
    const sponsors = getAll<Sponsor>(KEYS.sponsors);
    const idx = sponsors.findIndex(s => s.id === sponsor.id);
    if (idx >= 0) sponsors[idx] = sponsor; else sponsors.push(sponsor);
    setAll(KEYS.sponsors, sponsors);
  },

  // Spotlight Profiles
  getSpotlightProfiles: () => getAll<SpotlightProfile>(KEYS.spotlightProfiles),
  setSpotlightProfiles: (profiles: SpotlightProfile[]) => setAll(KEYS.spotlightProfiles, profiles),

  // Settings
  getSettings: (): PlatformSettings => {
    const s = getOne<PlatformSettings>(KEYS.settings);
    return s ?? { contactFormUrl: '', sponsorFormUrl: '' };
  },
  setSettings: (settings: PlatformSettings) => setOne(KEYS.settings, settings),

  // Notifications (stored on user records)
  addNotification: (notification: Notification) => {
    const users = getAll<User>(KEYS.users);
    const user = users.find(u => u.id === notification.userId);
    if (user) {
      user.notificationArea.push(notification);
      setAll(KEYS.users, users);
    }
  },

  // Seeding flag
  isSeeded: () => localStorage.getItem(KEYS.seeded) === 'true',
  markSeeded: () => localStorage.setItem(KEYS.seeded, 'true'),
};
