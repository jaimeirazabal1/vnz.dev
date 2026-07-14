-- =============================================
-- vnz.dev - Docker PostgreSQL Init
-- Applied automatically on first container start
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS & PROFILES
-- =============================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'developer' CHECK (role IN ('developer', 'client', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.developer_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  bio TEXT,
  hourly_rate_min NUMERIC(10,2),
  hourly_rate_max NUMERIC(10,2),
  availability TEXT NOT NULL DEFAULT 'freelance' CHECK (availability IN ('full_time', 'part_time', 'freelance')),
  experience_level TEXT NOT NULL DEFAULT 'mid' CHECK (experience_level IN ('junior', 'mid', 'senior', 'lead')),
  location TEXT,
  timezone TEXT,
  portfolio_url TEXT,
  github_url TEXT,
  linkedin_url TEXT
);

CREATE TABLE IF NOT EXISTS public.client_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  company_name TEXT,
  industry TEXT,
  country TEXT,
  budget_range TEXT
);

-- =============================================
-- SKILLS
-- =============================================

CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'devops', 'qa', 'uiux', 'architecture', 'pm', 'mobile', 'aiml', 'data', 'security', 'other'))
);

CREATE TABLE IF NOT EXISTS public.developer_skills (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency_level INTEGER NOT NULL DEFAULT 1 CHECK (proficiency_level BETWEEN 1 AND 5),
  PRIMARY KEY (user_id, skill_id)
);

-- =============================================
-- PROJECTS
-- =============================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget_min NUMERIC(10,2),
  budget_max NUMERIC(10,2),
  timeline_weeks INTEGER,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('draft', 'open', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_categories (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('discovery', 'design', 'development', 'qa', 'devops', 'maintenance')),
  PRIMARY KEY (project_id, category)
);

CREATE TABLE IF NOT EXISTS public.project_skills (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, skill_id)
);

-- =============================================
-- PROPOSALS
-- =============================================

CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  developer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  proposed_rate NUMERIC(10,2) NOT NULL,
  estimated_weeks INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- MILESTONES & PAYMENTS
-- =============================================

CREATE TABLE IF NOT EXISTS public.milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'funded', 'in_progress', 'submitted', 'review', 'approved', 'released', 'disputed')),
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  milestone_id UUID NOT NULL REFERENCES public.milestones(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT,
  amount NUMERIC(10,2) NOT NULL,
  platform_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- MESSAGING
-- =============================================

CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.conversation_members (
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  last_read_at TIMESTAMPTZ,
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- =============================================
-- REVIEWS
-- =============================================

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  quality_rating INTEGER NOT NULL CHECK (quality_rating BETWEEN 1 AND 5),
  communication_rating INTEGER NOT NULL CHECK (communication_rating BETWEEN 1 AND 5),
  deadline_rating INTEGER NOT NULL CHECK (deadline_rating BETWEEN 1 AND 5),
  technical_rating INTEGER NOT NULL CHECK (technical_rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_developer_profiles_experience ON public.developer_profiles(experience_level);
CREATE INDEX IF NOT EXISTS idx_developer_profiles_availability ON public.developer_profiles(availability);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_proposals_project_id ON public.proposals(project_id);
CREATE INDEX IF NOT EXISTS idx_proposals_developer_id ON public.proposals(developer_id);
CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON public.milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON public.reviews(reviewee_id);

-- =============================================
-- SEED DATA: Default skills
-- =============================================

INSERT INTO public.skills (name, slug, category) VALUES
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
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- TRIGGERS
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

-- =============================================
-- DONE
-- =============================================
SELECT 'vnz.dev schema initialized successfully!' AS status;
