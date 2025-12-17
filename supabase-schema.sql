-- =========================================
-- EDUTECH WEBSITE - COMPLETE SUPABASE SCHEMA
-- =========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- ACTIVITIES TABLE
-- =========================================
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Basic Info
  title_he TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  description_he TEXT NOT NULL,
  description_en TEXT,
  excerpt_he TEXT,
  excerpt_en TEXT,

  -- Classification
  track TEXT NOT NULL CHECK (track IN ('ai', 'kids', 'pro', 'edu', 'camp')),
  type TEXT NOT NULL CHECK (type IN ('lecture', 'workshop', 'course', 'camp', 'event')),
  category TEXT[],
  tags TEXT[],

  -- Content (MDX/Markdown)
  content_he TEXT,
  content_en TEXT,
  learning_outcomes_he TEXT[],
  learning_outcomes_en TEXT[],
  technologies TEXT[],

  -- Logistics
  duration_hours INTEGER,
  session_count INTEGER,
  location TEXT,
  is_online BOOLEAN DEFAULT false,
  is_onsite BOOLEAN DEFAULT false,
  prerequisites_he TEXT[],
  prerequisites_en TEXT[],

  -- Audience
  min_age INTEGER,
  max_age INTEGER,
  target_audience TEXT[],
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),

  -- Instructor (references instructors table)
  instructor_id UUID,

  -- Pricing & Availability
  base_price DECIMAL(10,2),
  currency TEXT DEFAULT 'ILS',
  has_discount BOOLEAN DEFAULT false,
  discount_percentage INTEGER,
  upcoming_dates JSONB,
  is_available BOOLEAN DEFAULT true,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,

  -- Media
  featured_image TEXT,
  gallery_images TEXT[],
  video_url TEXT,

  -- SEO
  meta_title_he TEXT,
  meta_title_en TEXT,
  meta_description_he TEXT,
  meta_description_en TEXT,

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0
);

-- Indexes for activities
CREATE INDEX idx_activities_track ON activities(track);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_status ON activities(status);
CREATE INDEX idx_activities_slug ON activities(slug);
CREATE INDEX idx_activities_published_at ON activities(published_at DESC);

-- =========================================
-- INSTRUCTORS TABLE
-- =========================================
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Personal Info
  name_he TEXT NOT NULL,
  name_en TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  profile_image TEXT,

  -- Professional Info
  title_he TEXT,
  title_en TEXT,
  bio_he TEXT,
  bio_en TEXT,
  specialties TEXT[],
  experience_years INTEGER,

  -- Qualifications
  education TEXT[],
  certifications TEXT[],
  achievements TEXT[],

  -- Social
  linkedin_url TEXT,
  github_url TEXT,
  website_url TEXT,

  -- Status
  is_active BOOLEAN DEFAULT true
);

-- Add foreign key constraint
ALTER TABLE activities ADD CONSTRAINT fk_instructor
  FOREIGN KEY (instructor_id) REFERENCES instructors(id)
  ON DELETE SET NULL;

-- =========================================
-- BLOG POSTS TABLE
-- =========================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Content
  title_he TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt_he TEXT,
  excerpt_en TEXT,
  content_he TEXT NOT NULL,
  content_en TEXT,

  -- Classification
  category TEXT NOT NULL,
  tags TEXT[],

  -- Author
  author_id UUID REFERENCES instructors(id),

  -- Media
  featured_image TEXT NOT NULL,

  -- Reading Info
  reading_time INTEGER,

  -- SEO
  meta_title_he TEXT,
  meta_title_en TEXT,
  meta_description_he TEXT,
  meta_description_en TEXT,

  -- Engagement
  views INTEGER DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for blog posts
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- =========================================
-- JOBS TABLE
-- =========================================
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Job Info
  title_he TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  description_he TEXT NOT NULL,
  description_en TEXT,

  -- Details
  track TEXT CHECK (track IN ('ai', 'kids', 'pro', 'edu', 'camp', 'general')),
  employment_type TEXT CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'freelance')),
  location TEXT,
  is_remote BOOLEAN DEFAULT false,

  -- Requirements
  requirements_he TEXT[],
  requirements_en TEXT[],
  responsibilities_he TEXT[],
  responsibilities_en TEXT[],
  qualifications_he TEXT[],
  qualifications_en TEXT[],

  -- Experience
  experience_required TEXT,

  -- Status
  is_active BOOLEAN DEFAULT true,
  applications_count INTEGER DEFAULT 0
);

-- Indexes for jobs
CREATE INDEX idx_jobs_track ON jobs(track);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);

-- =========================================
-- JOB APPLICATIONS TABLE
-- =========================================
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Job Reference
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,

  -- Applicant Info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  linkedin_url TEXT,
  portfolio_url TEXT,

  -- Application
  cover_letter TEXT,
  cv_url TEXT NOT NULL,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'interview', 'accepted', 'rejected')),
  notes TEXT
);

-- Indexes for applications
CREATE INDEX idx_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_applications_status ON job_applications(status);

-- =========================================
-- ACTIVITY REGISTRATIONS TABLE
-- =========================================
CREATE TABLE activity_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Activity Reference
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,

  -- Participant Info
  participant_name TEXT NOT NULL,
  participant_email TEXT NOT NULL,
  participant_phone TEXT NOT NULL,
  participant_age INTEGER,

  -- Parent Info (for minors)
  parent_name TEXT,
  parent_email TEXT,
  parent_phone TEXT,

  -- Additional Info
  selected_date DATE,
  notes TEXT,

  -- Payment
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_amount DECIMAL(10,2),
  payment_method TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  cancellation_reason TEXT
);

-- Indexes for registrations
CREATE INDEX idx_registrations_activity_id ON activity_registrations(activity_id);
CREATE INDEX idx_registrations_status ON activity_registrations(status);
CREATE INDEX idx_registrations_payment_status ON activity_registrations(payment_status);

-- =========================================
-- CONTACT SUBMISSIONS TABLE
-- =========================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Contact Info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,

  -- Message
  subject TEXT NOT NULL,
  message TEXT NOT NULL,

  -- Classification
  category TEXT CHECK (category IN ('general', 'activity-inquiry', 'partnership', 'media', 'support')),

  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'resolved', 'closed')),
  assigned_to UUID,
  response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Index for contacts
CREATE INDEX idx_contacts_status ON contact_submissions(status);

-- =========================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- =========================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  email TEXT UNIQUE NOT NULL,
  full_name TEXT,

  -- Preferences
  interests TEXT[],
  preferred_language TEXT DEFAULT 'he' CHECK (preferred_language IN ('he', 'en')),

  -- Status
  is_active BOOLEAN DEFAULT true,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for newsletter
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_is_active ON newsletter_subscribers(is_active);

-- =========================================
-- TESTIMONIALS TABLE
-- =========================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Testimonial Content
  content_he TEXT NOT NULL,
  content_en TEXT,

  -- Author
  author_name TEXT NOT NULL,
  author_title TEXT,
  author_company TEXT,
  author_image TEXT,

  -- Rating
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),

  -- Related Activity (optional)
  activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,

  -- Display
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  display_order INTEGER
);

-- Indexes for testimonials
CREATE INDEX idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX idx_testimonials_is_approved ON testimonials(is_approved);

-- =========================================
-- CHATBOT CONVERSATIONS TABLE (for analytics)
-- =========================================
CREATE TABLE chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  session_id TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  user_email TEXT,
  lead_captured BOOLEAN DEFAULT false
);

-- Index for chatbot
CREATE INDEX idx_chatbot_session ON chatbot_conversations(session_id);

-- =========================================
-- FUNCTIONS AND TRIGGERS
-- =========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON instructors
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activity_registrations_updated_at BEFORE UPDATE ON activity_registrations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================

-- Enable RLS on all tables
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Activities: Public can read published
CREATE POLICY "Public can view published activities"
ON activities FOR SELECT
USING (status = 'published');

-- Instructors: Public can view active
CREATE POLICY "Public can view active instructors"
ON instructors FOR SELECT
USING (is_active = true);

-- Blog Posts: Public can read published
CREATE POLICY "Public can view published blog posts"
ON blog_posts FOR SELECT
USING (status = 'published');

-- Jobs: Public can view active
CREATE POLICY "Public can view active jobs"
ON jobs FOR SELECT
USING (is_active = true);

-- Job Applications: Anyone can insert
CREATE POLICY "Anyone can apply for jobs"
ON job_applications FOR INSERT
WITH CHECK (true);

-- Activity Registrations: Anyone can register
CREATE POLICY "Anyone can register for activities"
ON activity_registrations FOR INSERT
WITH CHECK (true);

-- Contact Submissions: Anyone can submit
CREATE POLICY "Anyone can submit contact forms"
ON contact_submissions FOR INSERT
WITH CHECK (true);

-- Newsletter: Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
ON newsletter_subscribers FOR INSERT
WITH CHECK (true);

-- Testimonials: Public can view approved
CREATE POLICY "Public can view approved testimonials"
ON testimonials FOR SELECT
USING (is_approved = true);

-- Chatbot: Anyone can create conversations
CREATE POLICY "Anyone can use chatbot"
ON chatbot_conversations FOR INSERT
WITH CHECK (true);

-- =========================================
-- STORAGE BUCKETS
-- =========================================

-- Note: Run these in the Supabase Dashboard -> Storage section
--
-- 1. Create bucket 'images' (public)
-- 2. Create bucket 'documents' (private)
-- 3. Create bucket 'cvs' (private)
--
-- Or use the Supabase CLI/API
