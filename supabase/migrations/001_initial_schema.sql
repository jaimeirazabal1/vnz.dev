-- vnz.dev Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- USERS & PROFILES
-- =============================================

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null default '',
  avatar_url text,
  role text not null default 'developer' check (role in ('developer', 'client', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.developer_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  bio text,
  hourly_rate_min numeric(10,2),
  hourly_rate_max numeric(10,2),
  availability text not null default 'freelance' check (availability in ('full_time', 'part_time', 'freelance')),
  experience_level text not null default 'mid' check (experience_level in ('junior', 'mid', 'senior', 'lead')),
  location text,
  timezone text,
  portfolio_url text,
  github_url text,
  linkedin_url text
);

create table public.client_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  company_name text,
  industry text,
  country text,
  budget_range text
);

-- =============================================
-- SKILLS
-- =============================================

create table public.skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  category text not null check (category in ('frontend', 'backend', 'devops', 'qa', 'uiux', 'architecture', 'pm', 'mobile', 'aiml', 'data', 'security', 'other'))
);

create table public.developer_skills (
  user_id uuid references public.users(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete cascade,
  proficiency_level integer not null default 1 check (proficiency_level between 1 and 5),
  primary key (user_id, skill_id)
);

-- =============================================
-- PROJECTS
-- =============================================

create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text not null,
  budget_min numeric(10,2),
  budget_max numeric(10,2),
  timeline_weeks integer,
  status text not null default 'open' check (status in ('draft', 'open', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_categories (
  project_id uuid references public.projects(id) on delete cascade,
  category text not null check (category in ('discovery', 'design', 'development', 'qa', 'devops', 'maintenance')),
  primary key (project_id, category)
);

create table public.project_skills (
  project_id uuid references public.projects(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete cascade,
  primary key (project_id, skill_id)
);

-- =============================================
-- PROPOSALS
-- =============================================

create table public.proposals (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  developer_id uuid not null references public.users(id) on delete cascade,
  message text not null,
  proposed_rate numeric(10,2) not null,
  estimated_weeks integer not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at timestamptz not null default now()
);

-- =============================================
-- MILESTONES & PAYMENTS
-- =============================================

create table public.milestones (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  amount numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'funded', 'in_progress', 'submitted', 'review', 'approved', 'released', 'disputed')),
  due_date timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  milestone_id uuid not null references public.milestones(id) on delete cascade,
  stripe_payment_intent_id text,
  stripe_transfer_id text,
  amount numeric(10,2) not null,
  platform_fee numeric(10,2) not null default 0,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed', 'refunded')),
  created_at timestamptz not null default now()
);

-- =============================================
-- MESSAGING
-- =============================================

create table public.conversations (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.conversation_members (
  conversation_id uuid references public.conversations(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  last_read_at timestamptz,
  primary key (conversation_id, user_id)
);

create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

-- =============================================
-- REVIEWS
-- =============================================

create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  reviewer_id uuid not null references public.users(id) on delete cascade,
  reviewee_id uuid not null references public.users(id) on delete cascade,
  quality_rating integer not null check (quality_rating between 1 and 5),
  communication_rating integer not null check (communication_rating between 1 and 5),
  deadline_rating integer not null check (deadline_rating between 1 and 5),
  technical_rating integer not null check (technical_rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

-- =============================================
-- INDEXES
-- =============================================

create index idx_developer_profiles_experience on public.developer_profiles(experience_level);
create index idx_developer_profiles_availability on public.developer_profiles(availability);
create index idx_projects_client_id on public.projects(client_id);
create index idx_projects_status on public.projects(status);
create index idx_proposals_project_id on public.proposals(project_id);
create index idx_proposals_developer_id on public.proposals(developer_id);
create index idx_milestones_project_id on public.milestones(project_id);
create index idx_messages_conversation_id on public.messages(conversation_id);
create index idx_messages_created_at on public.messages(created_at);
create index idx_reviews_reviewee_id on public.reviews(reviewee_id);

-- =============================================
-- RLS POLICIES
-- =============================================

alter table public.users enable row level security;
alter table public.developer_profiles enable row level security;
alter table public.client_profiles enable row level security;
alter table public.skills enable row level security;
alter table public.developer_skills enable row level security;
alter table public.projects enable row level security;
alter table public.project_categories enable row level security;
alter table public.project_skills enable row level security;
alter table public.proposals enable row level security;
alter table public.milestones enable row level security;
alter table public.payments enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;

-- Users: read for everyone, write only for self
create policy "Users can view all profiles"
  on public.users for select
  using (true);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Developer profiles: public read, owner write
create policy "Developer profiles are public"
  on public.developer_profiles for select
  using (true);

create policy "Developers can update own profile"
  on public.developer_profiles for update
  using (auth.uid() = user_id);

create policy "Developers can insert own profile"
  on public.developer_profiles for insert
  with check (auth.uid() = user_id);

-- Client profiles: public read, owner write
create policy "Client profiles are public"
  on public.client_profiles for select
  using (true);

create policy "Clients can update own profile"
  on public.client_profiles for update
  using (auth.uid() = user_id);

create policy "Clients can insert own profile"
  on public.client_profiles for insert
  with check (auth.uid() = user_id);

-- Skills: public read, admin write
create policy "Skills are public"
  on public.skills for select
  using (true);

-- Developer skills: public read, owner write
create policy "Developer skills are public"
  on public.developer_skills for select
  using (true);

create policy "Developers can manage own skills"
  on public.developer_skills for all
  using (auth.uid() = user_id);

-- Projects: public read for open, owner read/write
create policy "Open projects are public"
  on public.projects for select
  using (status = 'open' or auth.uid() = client_id);

create policy "Clients can create projects"
  on public.projects for insert
  with check (auth.uid() = client_id);

create policy "Clients can update own projects"
  on public.projects for update
  using (auth.uid() = client_id);

-- Project categories & skills: follow project rules
create policy "Project categories are public"
  on public.project_categories for select
  using (true);

create policy "Clients can manage project categories"
  on public.project_categories for all
  using (
    exists (
      select 1 from public.projects
      where id = project_id and client_id = auth.uid()
    )
  );

create policy "Project skills are public"
  on public.project_skills for select
  using (true);

create policy "Clients can manage project skills"
  on public.project_skills for all
  using (
    exists (
      select 1 from public.projects
      where id = project_id and client_id = auth.uid()
    )
  );

-- Proposals: project owner + proposal author
create policy "Proposals visible to project owner and author"
  on public.proposals for select
  using (
    auth.uid() = developer_id or
    exists (
      select 1 from public.projects
      where id = project_id and client_id = auth.uid()
    )
  );

create policy "Developers can create proposals"
  on public.proposals for insert
  with check (auth.uid() = developer_id);

create policy "Developers can update own proposals"
  on public.proposals for update
  using (auth.uid() = developer_id);

create policy "Clients can update proposal status"
  on public.proposals for update
  using (
    exists (
      select 1 from public.projects
      where id = project_id and client_id = auth.uid()
    )
  );

-- Milestones: project participants only
create policy "Milestones visible to project participants"
  on public.milestones for select
  using (
    exists (
      select 1 from public.projects p
      left join public.proposals pr on pr.project_id = p.id
      where p.id = project_id
        and (p.client_id = auth.uid() or pr.developer_id = auth.uid())
    )
  );

create policy "Clients can manage milestones"
  on public.milestones for all
  using (
    exists (
      select 1 from public.projects
      where id = project_id and client_id = auth.uid()
    )
  );

-- Payments: project participants only
create policy "Payments visible to project participants"
  on public.payments for select
  using (
    exists (
      select 1 from public.milestones m
      join public.projects p on p.id = m.project_id
      left join public.proposals pr on pr.project_id = p.id
      where m.id = milestone_id
        and (p.client_id = auth.uid() or pr.developer_id = auth.uid())
    )
  );

-- Conversations: members only
create policy "Conversation members can view conversations"
  on public.conversations for select
  using (
    exists (
      select 1 from public.conversation_members
      where conversation_id = id and user_id = auth.uid()
    )
  );

create policy "Users can create conversations"
  on public.conversations for insert
  with check (true);

-- Conversation members
create policy "Members can view conversation members"
  on public.conversation_members for select
  using (
    exists (
      select 1 from public.conversation_members cm
      where cm.conversation_id = conversation_members.conversation_id
        and cm.user_id = auth.uid()
    )
  );

create policy "Users can add conversation members"
  on public.conversation_members for insert
  with check (true);

-- Messages: conversation members only
create policy "Conversation members can view messages"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversation_members
      where conversation_id = messages.conversation_id
        and user_id = auth.uid()
    )
  );

create policy "Conversation members can send messages"
  on public.messages for insert
  with check (
    auth.uid() = sender_id and
    exists (
      select 1 from public.conversation_members
      where conversation_id = messages.conversation_id
        and user_id = auth.uid()
    )
  );

-- Reviews: public read, project participants write
create policy "Reviews are public"
  on public.reviews for select
  using (true);

create policy "Participants can create reviews"
  on public.reviews for insert
  with check (
    auth.uid() = reviewer_id and
    exists (
      select 1 from public.projects p
      left join public.proposals pr on pr.project_id = p.id
      where p.id = project_id
        and (p.client_id = auth.uid() or pr.developer_id = auth.uid())
    )
  );

-- =============================================
-- TRIGGER: Auto-create user on signup
-- =============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', null)
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- TRIGGER: Update updated_at
-- =============================================

create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger update_users_updated_at
  before update on public.users
  for each row execute procedure public.update_updated_at();

create or replace trigger update_projects_updated_at
  before update on public.projects
  for each row execute procedure public.update_updated_at();

-- =============================================
-- SEED DATA: Default skills
-- =============================================

insert into public.skills (name, slug, category) values
  ('React', 'react', 'frontend'),
  ('Next.js', 'nextjs', 'frontend'),
  ('Vue.js', 'vuejs', 'frontend'),
  ('Angular', 'angular', 'frontend'),
  ('TypeScript', 'typescript', 'frontend'),
  ('Tailwind CSS', 'tailwindcss', 'frontend'),
  ('HTML/CSS', 'html-css', 'frontend'),
  ('Node.js', 'nodejs', 'backend'),
  ('Python', 'python', 'backend'),
  ('Go', 'go', 'backend'),
  ('Rust', 'rust', 'backend'),
  ('Java', 'java', 'backend'),
  ('C#', 'csharp', 'backend'),
  ('PHP', 'php', 'backend'),
  ('Ruby', 'ruby', 'backend'),
  ('PostgreSQL', 'postgresql', 'backend'),
  ('MongoDB', 'mongodb', 'backend'),
  ('GraphQL', 'graphql', 'backend'),
  ('REST APIs', 'rest-apis', 'backend'),
  ('Docker', 'docker', 'devops'),
  ('Kubernetes', 'kubernetes', 'devops'),
  ('AWS', 'aws', 'devops'),
  ('GCP', 'gcp', 'devops'),
  ('Azure', 'azure', 'devops'),
  ('CI/CD', 'cicd', 'devops'),
  ('Terraform', 'terraform', 'devops'),
  ('Linux', 'linux', 'devops'),
  ('Jest', 'jest', 'qa'),
  ('Cypress', 'cypress', 'qa'),
  ('Playwright', 'playwright', 'qa'),
  ('Selenium', 'selenium', 'qa'),
  ('Figma', 'figma', 'uiux'),
  ('Adobe XD', 'adobe-xd', 'uiux'),
  ('Sketch', 'sketch', 'uiux'),
  ('System Design', 'system-design', 'architecture'),
  ('Microservices', 'microservices', 'architecture'),
  ('Event-Driven', 'event-driven', 'architecture'),
  ('Scrum', 'scrum', 'pm'),
  ('Jira', 'jira', 'pm'),
  ('React Native', 'react-native', 'mobile'),
  ('Flutter', 'flutter', 'mobile'),
  ('iOS (Swift)', 'ios-swift', 'mobile'),
  ('Android (Kotlin)', 'android-kotlin', 'mobile'),
  ('Machine Learning', 'machine-learning', 'aiml'),
  ('Deep Learning', 'deep-learning', 'aiml'),
  ('NLP', 'nlp', 'aiml'),
  ('Computer Vision', 'computer-vision', 'aiml'),
  ('Data Engineering', 'data-engineering', 'data'),
  ('SQL', 'sql', 'data'),
  ('Pandas', 'pandas', 'data'),
  ('Security Auditing', 'security-auditing', 'security'),
  ('Penetration Testing', 'penetration-testing', 'security')
on conflict (name) do nothing;
