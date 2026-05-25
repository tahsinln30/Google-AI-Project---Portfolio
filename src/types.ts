/**
 * Types for Tahsin Ahmed's Portfolio
 */

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  grade?: string;
  field?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  details: string[];
  isCurrent?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  type: 'Web' | 'Mobile' | 'Web & Mobile';
  description: string;
  tags: string[];
}

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  url: string;
  year?: string;
}

export interface HonorItem {
  id: string;
  title: string;
  awardedBy: string;
  details?: string;
}

export interface SkillType {
  name: string;
  level: number; // Percentage (e.g., 95)
  category: 'core' | 'automation' | 'tools';
}
