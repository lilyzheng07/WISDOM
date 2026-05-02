export type STEMCategory = 'Science' | 'Technology' | 'Engineering' | 'Mathematics';

export interface UserDiscipline {
  category: STEMCategory;
  subFields: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'enquiry_response' | 'thread_removed' | 'connection_accepted' | 'connection_request';
  message: string;
  read: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  age: number;
  isMinor: boolean;
  role: 'user' | 'admin';
  location: string;
  disciplines: UserDiscipline[];
  tags: string[];
  participationRole: 'seeking_help' | 'here_to_help';
  following: string[];
  recentlyVisitedBoards: string[];
  notificationArea: Notification[];
  createdAt: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  category: STEMCategory;
  threadCount: number;
  lastActivityAt: string;
  createdAt: string;
}

export interface Thread {
  id: string;
  boardId: string;
  authorId: string;
  title: string;
  detailQuestions: string;
  description: string;
  tags: string[];
  status: 'pending' | 'published' | 'removed';
  isAdultOnly: boolean;
  replyCount: number;
  engagementScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: string;
  threadId: string;
  authorId: string;
  content: string;
  parentReplyId: string | null;
  createdAt: string;
}

export interface Connection {
  id: string;
  requesterId: string;
  targetId: string;
  status: 'pending' | 'accepted' | 'rejected';
  requiresAdminApproval: boolean;
  adminApproved: boolean | null;
  createdAt: string;
}

export interface AdviceQuestion {
  id: string;
  fromUserId: string;
  toUserId: string;
  question: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'Networking' | 'Catchup' | 'Internship Opportunity' | 'Mentorship Opportunity';
  date: string;
  time: string;
  location: string;
  description: string;
  organiserId: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  userId: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  adminResponse: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string | null;
  isActive: boolean;
  isSeeded: boolean;
  createdAt: string;
}

export interface SpotlightProfile {
  id: string;
  name: string;
  field: string;
  organisation: string;
  bio: string;
  avatarUrl: string | null;
  isSeeded: boolean;
}

export interface Tag {
  id: string;
  label: string;
  category: STEMCategory | 'General';
}

export interface PlatformSettings {
  contactFormUrl: string;
  sponsorFormUrl: string;
}

export interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  age: number;
  location: string;
  disciplines: UserDiscipline[];
  tags: string[];
  participationRole: 'seeking_help' | 'here_to_help';
}

export interface NewThreadData {
  boardId: string;
  title: string;
  detailQuestions: string;
  description: string;
  tags: string[];
}

export interface NewReplyData {
  threadId: string;
  content: string;
  parentReplyId: string | null;
}

export interface NewEventData {
  title: string;
  type: 'Networking' | 'Catchup' | 'Internship Opportunity' | 'Mentorship Opportunity';
  date: string;
  time: string;
  location: string;
  description: string;
}
