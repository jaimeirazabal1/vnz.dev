export type UserRole = "developer" | "client" | "admin";

export type ExperienceLevel = "junior" | "mid" | "senior" | "lead";

export type Availability = "full_time" | "part_time" | "freelance";

export type SdlcCategory =
  | "discovery"
  | "design"
  | "development"
  | "qa"
  | "devops"
  | "maintenance";

export type ProjectStatus = "draft" | "open" | "in_progress" | "completed" | "cancelled";

export type ProposalStatus = "pending" | "accepted" | "rejected" | "withdrawn";

export type MilestoneStatus =
  | "pending"
  | "funded"
  | "in_progress"
  | "submitted"
  | "review"
  | "approved"
  | "released"
  | "disputed";

export type SkillCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "qa"
  | "uiux"
  | "architecture"
  | "pm"
  | "mobile"
  | "aiml"
  | "data"
  | "security"
  | "other";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface DeveloperProfile {
  user_id: string;
  bio: string | null;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  availability: Availability;
  experience_level: ExperienceLevel;
  location: string | null;
  timezone: string | null;
  portfolio_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
}

export interface ClientProfile {
  user_id: string;
  company_name: string | null;
  industry: string | null;
  country: string | null;
  budget_range: string | null;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  category: SkillCategory;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  budget_min: number | null;
  budget_max: number | null;
  timeline_weeks: number | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  project_id: string;
  developer_id: string;
  message: string;
  proposed_rate: number;
  estimated_weeks: number;
  status: ProposalStatus;
  created_at: string;
}

export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  amount: number;
  status: MilestoneStatus;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  project_id: string;
  reviewer_id: string;
  reviewee_id: string;
  quality_rating: number;
  communication_rating: number;
  deadline_rating: number;
  technical_rating: number;
  comment: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
}

export interface Conversation {
  id: string;
  project_id: string | null;
  created_at: string;
  updated_at: string;
}
