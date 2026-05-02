import type { STEMCategory, Tag } from '../types';

export const STEM_TAXONOMY: Record<STEMCategory, string[]> = {
  Science:     ['Research Sciences', 'Biology', 'Chemistry', 'Psychology'],
  Technology:  ['Biotechnology'],
  Engineering: ['Mechatronic', 'Chemical', 'Mechanical', 'Electronic'],
  Mathematics: ['Actuarial Studies', 'Statistics', 'Mathematical Research'],
};

export const STEM_CATEGORIES: STEMCategory[] = ['Science', 'Technology', 'Engineering', 'Mathematics'];

export const PREDEFINED_TAGS: Tag[] = [
  { id: 'tag-1',  label: 'Research',              category: 'Science' },
  { id: 'tag-2',  label: 'Biology',               category: 'Science' },
  { id: 'tag-3',  label: 'Chemistry',             category: 'Science' },
  { id: 'tag-4',  label: 'Psychology',            category: 'Science' },
  { id: 'tag-5',  label: 'Biotechnology',         category: 'Technology' },
  { id: 'tag-6',  label: 'Software',              category: 'Technology' },
  { id: 'tag-7',  label: 'AI/ML',                 category: 'Technology' },
  { id: 'tag-8',  label: 'Mechatronics',          category: 'Engineering' },
  { id: 'tag-9',  label: 'Chemical Engineering',  category: 'Engineering' },
  { id: 'tag-10', label: 'Mechanical Engineering', category: 'Engineering' },
  { id: 'tag-11', label: 'Electronics',           category: 'Engineering' },
  { id: 'tag-12', label: 'Actuarial',             category: 'Mathematics' },
  { id: 'tag-13', label: 'Statistics',            category: 'Mathematics' },
  { id: 'tag-14', label: 'Data Science',          category: 'Mathematics' },
  { id: 'tag-15', label: 'Mentorship',            category: 'General' },
  { id: 'tag-16', label: 'Career Guidance',       category: 'General' },
  { id: 'tag-17', label: 'Networking',            category: 'General' },
  { id: 'tag-18', label: 'Student',               category: 'General' },
  { id: 'tag-19', label: 'Early Career',          category: 'General' },
  { id: 'tag-20', label: 'Leadership',            category: 'General' },
];
