# EduTech Website - Activities & Blog System Implementation Plan

## Table of Contents
1. [Schema Analysis](#schema-analysis)
2. [Activities System](#activities-system)
3. [Blog System](#blog-system)
4. [Shared Infrastructure](#shared-infrastructure)
5. [Implementation Phases](#implementation-phases)

---

## Schema Analysis

### Key Database Tables

#### Activities Table
- **Purpose**: Core content for all training/educational activities
- **Key Fields**:
  - Internationalization: `title_he`, `title_en`, `description_he`, `description_en`
  - Classification: `track` (ai/kids/pro/edu/camp), `type` (lecture/workshop/course/camp/event), `category[]`, `tags[]`
  - Content: `content_he`, `content_en` (MDX/Markdown support), `learning_outcomes_*`, `technologies[]`
  - Logistics: `duration_hours`, `session_count`, `location`, `is_online`, `is_onsite`, `prerequisites_*`
  - Audience: `min_age`, `max_age`, `target_audience[]`, `difficulty_level`
  - Instructor: Foreign key to `instructors` table
  - Pricing: `base_price`, `currency`, `discount_percentage`, `upcoming_dates` (JSONB)
  - Media: `featured_image`, `gallery_images[]`, `video_url`
  - SEO: `meta_title_*`, `meta_description_*`
  - Status: `status` (draft/published/archived), `published_at`, `views`

#### Blog Posts Table
- **Purpose**: Rich blog content with author information
- **Key Fields**:
  - Content: `title_*`, `slug`, `excerpt_*`, `content_*` (MDX/Markdown)
  - Classification: `category`, `tags[]`
  - Author: Foreign key to `instructors` table
  - Media: `featured_image`
  - Engagement: `reading_time`, `views`
  - SEO: `meta_title_*`, `meta_description_*`
  - Status: `status`, `published_at`

#### Related Tables
- **instructors**: Author/instructor information
- **activity_registrations**: User registration with payment tracking
- **testimonials**: User reviews and ratings (optional comments)

---

## Activities System

### 1. File Structure

```
src/
├── app/[locale]/
│   ├── activities/
│   │   ├── page.tsx                 # Activities listing page
│   │   ├── layout.tsx               # Activities layout
│   │   ├── [slug]/
│   │   │   ├── page.tsx             # Single activity page
│   │   │   └── layout.tsx           # Activity detail layout
│   │   └── error.tsx                # Error boundary
│   └── api/
│       ├── activities/
│       │   ├── route.ts             # GET activities (listing, filtering)
│       │   ├── [id]/
│       │   │   └── route.ts         # GET single activity
│       │   └── related/
│       │       └── route.ts         # GET related activities
│       ├── registrations/
│       │   └── route.ts             # POST registration
│       └── activity-search/
│           └── route.ts             # POST search with filters
│
├── components/
│   ├── activities/
│   │   ├── ActivitiesGrid.tsx       # Main grid layout with filters
│   │   ├── ActivityCard.tsx         # Activity card component
│   │   ├── ActivityFilters.tsx      # Filter sidebar component
│   │   ├── FilterSidebar.tsx        # Mobile/desktop filter UI
│   │   ├── ActivityDetails.tsx      # Single activity details
│   │   ├── PrerequisitesDisplay.tsx # Prerequisites section
│   │   ├── InstructorCard.tsx       # Instructor info card
│   │   ├── RegistrationForm.tsx     # Registration form
│   │   ├── PaymentInfo.tsx          # Payment information display
│   │   ├── RelatedActivities.tsx    # Related activities carousel
│   │   ├── UpcomingDates.tsx        # Upcoming dates picker
│   │   ├── LearningOutcomes.tsx     # Learning outcomes list
│   │   ├── TechnologiesUsed.tsx     # Technologies/tools list
│   │   ├── ReviewsSection.tsx       # Testimonials/reviews
│   │   └── ShareActivity.tsx        # Social share buttons
│   └── shared/
│       ├── PriceDisplay.tsx         # Price with discount
│       ├── DifficultyBadge.tsx      # Difficulty level badge
│       └── TrackBadge.tsx           # Track/program badge
│
├── lib/
│   ├── activities/
│   │   ├── queries.ts              # Supabase queries
│   │   ├── filters.ts              # Filter logic
│   │   ├── validation.ts           # Form validation (Zod)
│   │   └── transformers.ts         # Data transformation
│   └── payment/
│       └── handler.ts              # Payment processing logic
│
└── types/
    ├── activities.ts               # Activity interfaces
    ├── registrations.ts            # Registration interfaces
    └── filters.ts                  # Filter types
```

### 2. Component Breakdown

#### A. Listing Page Components

**ActivitiesGrid.tsx**
```typescript
// Main container managing state and filters
interface ActivitiesGridProps {
  initialActivities: Activity[];
  totalCount: number;
  locale: string;
}

State:
- activitiesData: Activity[]
- filters: ActivityFilters
- isLoading: boolean
- error: string | null
- currentPage: number
- pageSize: number
```

**ActivityFilters.tsx**
```typescript
// Controlled filter inputs
interface ActivityFiltersProps {
  onFilterChange: (filters: ActivityFilters) => void;
  availableTracks: string[];
  availableTypes: string[];
  difficultyLevels: string[];
  priceRange: { min: number; max: number };
  locale: string;
}

Filters:
- Track (multiple select)
- Type (multiple select)
- Difficulty (radio group)
- Date range (date picker)
- Price range (slider)
- Availability (online/onsite)
- Search term (text input)
```

**ActivityCard.tsx**
```typescript
// Reusable card component
interface ActivityCardProps {
  activity: Activity;
  variant?: 'default' | 'compact' | 'featured';
  locale: string;
}

Displays:
- Featured image with overlay
- Title and excerpt
- Track and type badges
- Difficulty level
- Price with discount
- Duration
- CTA button
- Rating/views count
```

#### B. Single Activity Page Components

**ActivityDetails.tsx**
```typescript
// Main detail container
interface ActivityDetailsProps {
  activity: Activity;
  instructor?: Instructor;
  locale: string;
}

Sections:
- Hero section (image + title + metadata)
- Quick info (duration, level, participants)
- Description (MDX rendered)
- Learning outcomes
- Technologies
- Prerequisites
- Instructor card
- Upcoming dates
- Reviews/testimonials
- Registration CTA
```

**RegistrationForm.tsx**
```typescript
// Multi-step registration form
interface RegistrationFormProps {
  activity: Activity;
  locale: string;
  onSuccess: (registration: ActivityRegistration) => void;
}

Steps:
1. Participant Information
   - Name, Email, Phone
   - Age (auto-show parent form if minor)
   - Notes
2. Parent Information (conditional)
   - Parent name, email, phone
3. Date Selection
   - Date picker for upcoming_dates
4. Payment Information
   - Payment method selection
   - Terms & conditions
5. Summary & Submit

Validations:
- Email format
- Phone number format
- Required fields
- Age vs prerequisites
- Capacity check
```

**PaymentInfo.tsx**
```typescript
// Display payment details
interface PaymentInfoProps {
  activity: Activity;
  selectedDate?: Date;
  locale: string;
}

Displays:
- Base price
- Discount (if applicable)
- Final price calculation
- Payment methods accepted
- Security badges
- Refund policy
```

#### C. Related Content Components

**RelatedActivities.tsx**
```typescript
// Carousel of related activities
interface RelatedActivitiesProps {
  activity: Activity;
  count?: number;
  locale: string;
}

Logic:
- Filter by same track
- Filter by overlapping tags
- Exclude current activity
- Sort by relevance
```

**PrerequisitesDisplay.tsx**
```typescript
interface PrerequisitesDisplayProps {
  prerequisites: string[];
  locale: string;
  canProceed?: boolean;
}
```

### 3. API Routes

#### Listing & Search
```
GET /api/activities
Query Parameters:
  - locale: 'he' | 'en'
  - page: number (default: 1)
  - limit: number (default: 12)
  - track?: 'ai' | 'kids' | 'pro' | 'edu' | 'camp'
  - type?: 'lecture' | 'workshop' | 'course' | 'camp' | 'event'
  - difficulty?: 'beginner' | 'intermediate' | 'advanced'
  - minPrice?: number
  - maxPrice?: number
  - startDate?: ISO8601
  - endDate?: ISO8601
  - isOnline?: boolean
  - isOnsite?: boolean
  - search?: string
  - sort?: 'newest' | 'popular' | 'price-asc' | 'price-desc'

Response:
{
  data: Activity[]
  total: number
  page: number
  pageCount: number
  aggregations: {
    tracks: { value: string, count: number }[]
    types: { value: string, count: number }[]
    difficulties: { value: string, count: number }[]
    priceRange: { min: number, max: number }
  }
}
```

#### Single Activity
```
GET /api/activities/[id]
Query Parameters:
  - locale: 'he' | 'en'

Response:
{
  data: Activity & {
    instructor?: Instructor
    relatedActivities?: Activity[]
    testimonials?: Testimonial[]
  }
}
```

#### Related Activities
```
POST /api/activities/related
Body:
{
  activityId: string
  limit: number = 3
  locale: string
}

Response:
{
  data: Activity[]
}
```

#### Registration
```
POST /api/registrations
Body:
{
  activityId: string
  participantName: string
  participantEmail: string
  participantPhone: string
  participantAge?: number
  parentName?: string
  parentEmail?: string
  parentPhone?: string
  selectedDate: string (ISO8601)
  notes?: string
  paymentMethod: string
  locale: string
}

Response:
{
  success: boolean
  registrationId: string
  paymentUrl?: string
  message: string
}
```

### 4. Data Fetching Strategy

#### Server-Side Data Fetching (Page Level)
```typescript
// /app/[locale]/activities/page.tsx
export default async function ActivitiesPage({
  params: { locale },
  searchParams
}: {
  params: { locale: string }
  searchParams: Record<string, string>
}) {
  const supabase = await createServerSupabaseClient()
  
  // Build query from searchParams
  const filters = parseActivityFilters(searchParams)
  
  // Fetch from API route (internal)
  const activities = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/activities`,
    {
      method: 'GET',
      headers: { 'Accept-Language': locale },
      next: { revalidate: 60 } // ISR
    }
  ).then(r => r.json())

  return <ActivitiesPage activities={activities} locale={locale} />
}
```

#### Dynamic Routes with ISR
```typescript
// /app/[locale]/activities/[slug]/page.tsx
export async function generateStaticParams() {
  // Generate paths for all published activities
  const supabase = await createServerSupabaseClient()
  const { data: activities } = await supabase
    .from('activities')
    .select('slug')
    .eq('status', 'published')
  
  return activities?.map(a => ({ slug: a.slug })) ?? []
}

export default async function ActivityPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const supabase = await createServerSupabaseClient()
  
  const { data: activity } = await supabase
    .from('activities')
    .select(`
      *,
      instructors(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (!activity) notFound()
  
  return <ActivityDetailPage activity={activity} locale={locale} />
}
```

#### Client-Side Filtering
```typescript
// /components/activities/ActivitiesGrid.tsx
'use client'

export function ActivitiesGrid({ initialActivities, locale }: Props) {
  const [activities, setActivities] = useState(initialActivities)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const handleFilterChange = useCallback(
    async (newFilters: ActivityFilters) => {
      setIsLoading(true)
      
      // Create query string from filters
      const params = new URLSearchParams()
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) params.append(key, String(value))
      })
      
      // Update URL
      router.push(`?${params.toString()}`)
      
      // Fetch filtered results
      const response = await fetch(`/api/activities?${params.toString()}`, {
        headers: { 'Accept-Language': locale }
      })
      const data = await response.json()
      
      setActivities(data.data)
      setIsLoading(false)
    },
    [locale, router]
  )
  
  return <ActivityFilters onChange={handleFilterChange} />
}
```

#### Real-Time Updates (Optional)
```typescript
// Subscribe to activity changes for real-time updates
useEffect(() => {
  const subscription = supabase
    .channel('activity-updates')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'activities' },
      (payload) => {
        // Refetch activity data
        setActivities(prev => 
          prev.map(a => a.id === payload.new.id ? payload.new : a)
        )
      }
    )
    .subscribe()
  
  return () => subscription.unsubscribe()
}, [])
```

### 5. SEO Considerations

#### Meta Tags
```typescript
// /lib/seo/metadata.ts
export function generateActivityMetadata(activity: Activity, locale: string) {
  const title = locale === 'he' ? activity.meta_title_he : activity.meta_title_en
  const description = locale === 'he' 
    ? activity.meta_description_he 
    : activity.meta_description_en
  
  return {
    title: title || activity[`title_${locale}`],
    description: description || activity[`excerpt_${locale}`],
    openGraph: {
      title,
      description,
      images: [activity.featured_image],
      type: 'article',
      publishedTime: activity.published_at,
      url: `/activities/${activity.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [activity.featured_image]
    }
  }
}
```

#### Structured Data (JSON-LD)
```typescript
// /components/activities/ActivityStructuredData.tsx
export function ActivityStructuredData({ activity, instructor, locale }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: activity[`title_${locale}`],
    description: activity[`description_${locale}`],
    image: activity.featured_image,
    duration: `PT${activity.duration_hours}H`,
    price: activity.base_price,
    priceCurrency: activity.currency,
    url: `/activities/${activity.slug}`,
    datePublished: activity.published_at,
    author: {
      '@type': 'Person',
      name: instructor?.[`name_${locale}`],
      image: instructor?.profile_image
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: calculateAvgRating(testimonials),
      ratingCount: testimonials.length
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

#### Sitemaps
```typescript
// /app/sitemap.ts
export default async function sitemap() {
  const supabase = await createServerSupabaseClient()
  
  const { data: activities } = await supabase
    .from('activities')
    .select('slug, updated_at')
    .eq('status', 'published')
  
  return activities?.map(activity => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/activities/${activity.slug}`,
    lastModified: activity.updated_at,
    changeFrequency: 'weekly',
    priority: 0.8
  })) ?? []
}
```

#### Performance Optimization
- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Lazy loading of below-fold components
- Debounced filter changes
- Query deduplication

---

## Blog System

### 1. File Structure

```
src/
├── app/[locale]/
│   ├── blog/
│   │   ├── page.tsx                # Blog listing page
│   │   ├── layout.tsx              # Blog layout
│   │   ├── [slug]/
│   │   │   ├── page.tsx            # Single post page
│   │   │   └── layout.tsx          # Post layout
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       └── page.tsx        # Category posts
│   │   ├── tag/
│   │   │   └── [tag]/
│   │   │       └── page.tsx        # Tag posts
│   │   └── error.tsx
│   └── api/
│       ├── posts/
│       │   ├── route.ts            # GET posts (listing, filtering)
│       │   ├── [id]/
│       │   │   └── route.ts        # GET single post
│       │   ├── search/
│       │   │   └── route.ts        # POST search
│       │   └── featured/
│       │       └── route.ts        # GET featured posts
│       ├── comments/
│       │   ├── route.ts            # POST comment
│       │   └── [id]/
│       │       └── route.ts        # DELETE comment
│       └── blog-categories/
│           └── route.ts            # GET categories/tags
│
├── components/
│   ├── blog/
│   │   ├── BlogGrid.tsx            # Main blog grid with filters
│   │   ├── BlogCard.tsx            # Blog post card
│   │   ├── BlogFilters.tsx         # Category/tag filters
│   │   ├── BlogSidebar.tsx         # Sidebar (categories, popular posts)
│   │   ├── PostContent.tsx         # Single post with MDX
│   │   ├── AuthorCard.tsx          # Author information
│   │   ├── RelatedPosts.tsx        # Related posts carousel
│   │   ├── TableOfContents.tsx     # Auto-generated TOC
│   │   ├── CommentsSection.tsx     # Comments (optional)
│   │   ├── CommentForm.tsx         # Comment form
│   │   ├── SharePost.tsx           # Social share buttons
│   │   ├── ReadingTimeEstimate.tsx # Reading time display
│   │   ├── CategoryBadge.tsx       # Category badge
│   │   └── PostMeta.tsx            # Date, author, reading time
│   └── shared/
│       ├── SearchBar.tsx           # Global search
│       └── TagCloud.tsx            # Tag cloud component
│
├── lib/
│   ├── blog/
│   │   ├── queries.ts              # Supabase queries
│   │   ├── mdx.ts                  # MDX processing
│   │   ├── markdown.ts             # Markdown utilities
│   │   ├── toc.ts                  # Table of contents generator
│   │   ├── reading-time.ts         # Reading time calculator
│   │   └── transformers.ts         # Data transformation
│   └── search/
│       ├── algolia.ts              # Algolia client (optional)
│       └── full-text.ts            # Full-text search
│
└── types/
    ├── blog.ts                     # Blog post interfaces
    ├── comments.ts                 # Comment interfaces
    └── mdx.ts                      # MDX types
```

### 2. Component Breakdown

#### A. Listing Page Components

**BlogGrid.tsx**
```typescript
// Main blog grid with pagination and filters
interface BlogGridProps {
  initialPosts: BlogPost[]
  totalCount: number
  locale: string
}

Features:
- Grid/list view toggle
- Category/tag filters
- Search functionality
- Sorting (newest, popular, trending)
- Pagination
- Featured posts section
```

**BlogCard.tsx**
```typescript
// Blog post card component
interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'compact'
  locale: string
}

Displays:
- Featured image with category badge
- Title
- Excerpt
- Author info
- Published date
- Reading time
- Tag badges
- CTA button
```

**BlogSidebar.tsx**
```typescript
// Right sidebar content
interface BlogSidebarProps {
  categories: string[]
  popularPosts: BlogPost[]
  recentPosts: BlogPost[]
  locale: string
}

Sections:
- Categories list with counts
- Popular posts
- Recent posts
- Newsletter signup (optional)
```

#### B. Single Post Components

**PostContent.tsx**
```typescript
// Main post content with MDX rendering
interface PostContentProps {
  post: BlogPost
  author: Instructor
  locale: string
  comments?: Comment[]
}

Features:
- MDX/Markdown rendering with syntax highlighting
- Code block styling (with copy button)
- Image optimization
- Embedded components (callouts, alerts, etc.)
- Footnotes
- Internal/external link handling
```

**AuthorCard.tsx**
```typescript
interface AuthorCardProps {
  author: Instructor
  locale: string
  relatedPosts?: BlogPost[]
}

Displays:
- Author photo
- Author name and title
- Bio
- Social links (LinkedIn, GitHub, website)
- Related posts by author (optional)
```

**TableOfContents.tsx**
```typescript
interface TableOfContentsProps {
  content: string
  locale: string
  sticky?: boolean
}

Features:
- Auto-extract headings from MDX
- Smooth scroll to sections
- Active section highlight
- Sticky positioning (desktop)
```

**CommentsSection.tsx**
```typescript
interface CommentsSectionProps {
  postId: string
  locale: string
  isOpen?: boolean
}

Features:
- Display comments with threading
- Pagination
- Rating/helpful votes
- Reply functionality
- Spam protection
```

#### C. Filter Components

**BlogFilters.tsx**
```typescript
interface BlogFiltersProps {
  onFilterChange: (filters: BlogFilters) => void
  availableCategories: string[]
  availableTags: string[]
  locale: string
}

Filters:
- Category (single or multi-select)
- Tags (multi-select)
- Date range
- Author filter
- Search term
```

### 3. API Routes

#### Listing & Search
```
GET /api/posts
Query Parameters:
  - locale: 'he' | 'en'
  - page: number (default: 1)
  - limit: number (default: 10)
  - category?: string
  - tags?: string[] (comma-separated)
  - author?: string
  - search?: string
  - sort?: 'newest' | 'popular' | 'trending' | 'oldest'
  - featured?: boolean

Response:
{
  data: BlogPost[]
  total: number
  page: number
  pageCount: number
  aggregations: {
    categories: { value: string, count: number }[]
    tags: { value: string, count: number }[]
  }
}
```

#### Single Post
```
GET /api/posts/[id]
Query Parameters:
  - locale: 'he' | 'en'

Response:
{
  data: BlogPost & {
    author: Instructor
    relatedPosts: BlogPost[]
    comments: Comment[]
    tableOfContents: TOCItem[]
  }
}
```

#### Search
```
POST /api/posts/search
Body:
{
  query: string
  locale: string
  limit: number = 10
}

Response:
{
  data: BlogPost[]
  total: number
}
```

#### Comments
```
POST /api/comments
Body:
{
  postId: string
  content: string
  author: string
  email: string
  replyToId?: string
}

Response:
{
  success: boolean
  comment: Comment
}

DELETE /api/comments/[id]
Headers:
  - Authorization: Bearer token (admin only)
```

### 4. Data Fetching Strategy

#### Server-Side Data Fetching
```typescript
// /app/[locale]/blog/page.tsx
export default async function BlogPage({
  params: { locale },
  searchParams
}: Props) {
  const supabase = await createServerSupabaseClient()
  
  const page = parseInt(searchParams.page) || 1
  const limit = 10
  const offset = (page - 1) * limit
  
  let query = supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
  
  // Apply filters
  if (searchParams.category) {
    query = query.eq('category', searchParams.category)
  }
  if (searchParams.tags) {
    query = query.contains('tags', [searchParams.tags])
  }
  
  // Sort and paginate
  const { data: posts, count } = await query
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  // Fetch categories with counts
  const { data: categories } = await supabase
    .from('blog_posts')
    .select('category')
    .eq('status', 'published')
  
  return <BlogPage posts={posts} categories={categories} total={count} />
}
```

#### MDX Processing
```typescript
// /lib/blog/mdx.ts
import { compile } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export async function compileMDX(content: string, locale: string) {
  try {
    const compiled = await compile(content, {
      jsxImportSource: '@emotion/react',
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
      development: process.env.NODE_ENV === 'development'
    })
    
    return compiled.toString()
  } catch (error) {
    console.error('MDX compilation error:', error)
    return null
  }
}

export async function extractTableOfContents(content: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: TOCItem[] = []
  let match
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2]
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    
    headings.push({ level, text, slug })
  }
  
  return headings
}
```

#### Incremental Static Regeneration
```typescript
// Generate routes dynamically
export async function generateStaticParams() {
  const supabase = await createServerSupabaseClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
  
  return posts?.map(p => ({ slug: p.slug })) ?? []
}

export const revalidate = 3600 // Revalidate every hour
```

### 5. SEO Considerations

#### Meta Tags
```typescript
// /lib/seo/blog-metadata.ts
export function generatePostMetadata(post: BlogPost, locale: string) {
  const title = locale === 'he' ? post.meta_title_he : post.meta_title_en
  const description = locale === 'he' 
    ? post.meta_description_he 
    : post.meta_description_en
  
  return {
    title: title || post[`title_${locale}`],
    description: description || post[`excerpt_${locale}`],
    keywords: post.tags,
    openGraph: {
      type: 'article',
      title,
      description,
      images: [post.featured_image],
      publishedTime: post.published_at,
      authors: [post.author?.name_en],
      tags: post.tags,
      url: `/blog/${post.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: post.featured_image,
      creator: post.author?.twitter_handle
    }
  }
}
```

#### Blog Post Schema (JSON-LD)
```typescript
export function BlogPostStructuredData({ post, author, locale }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post[`title_${locale}`],
    description: post[`excerpt_${locale}`],
    image: post.featured_image,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: author?.[`name_${locale}`],
      image: author?.profile_image
    },
    articleBody: post[`content_${locale}`],
    keywords: post.tags.join(', ')
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

#### Sitemaps
```typescript
// /app/sitemap.ts (extend existing)
export default async function sitemap() {
  const supabase = await createServerSupabaseClient()
  
  const { data: activities } = await supabase
    .from('activities')
    .select('slug, updated_at')
    .eq('status', 'published')
  
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published')
  
  return [
    ...activities?.map(activity => ({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/activities/${activity.slug}`,
      lastModified: activity.updated_at,
      changeFrequency: 'weekly',
      priority: 0.8
    })) ?? [],
    ...posts?.map(post => ({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
      lastModified: post.updated_at,
      changeFrequency: 'monthly',
      priority: 0.7
    })) ?? []
  ]
}
```

#### Open Graph Images (Dynamic)
```typescript
// /app/[locale]/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export default async function Image({ params: { locale, slug } }: Props) {
  const post = await getPost(slug, locale)
  
  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        width: '1200px',
        height: '630px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <h1 style={{ color: 'white', fontSize: '60px', margin: 0 }}>
          {post[`title_${locale}`]}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
```

---

## Shared Infrastructure

### 1. Type Definitions

#### Activity Types
```typescript
// /src/types/activities.ts
export interface Activity {
  id: string
  created_at: string
  updated_at: string
  
  title_he: string
  title_en?: string
  slug: string
  description_he: string
  description_en?: string
  excerpt_he?: string
  excerpt_en?: string
  
  track: 'ai' | 'kids' | 'pro' | 'edu' | 'camp'
  type: 'lecture' | 'workshop' | 'course' | 'camp' | 'event'
  category?: string[]
  tags?: string[]
  
  content_he?: string
  content_en?: string
  learning_outcomes_he?: string[]
  learning_outcomes_en?: string[]
  technologies?: string[]
  
  duration_hours?: number
  session_count?: number
  location?: string
  is_online: boolean
  is_onsite: boolean
  prerequisites_he?: string[]
  prerequisites_en?: string[]
  
  min_age?: number
  max_age?: number
  target_audience?: string[]
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
  
  instructor_id?: string
  
  base_price?: number
  currency: string
  has_discount: boolean
  discount_percentage?: number
  upcoming_dates: UpcomingDate[]
  is_available: boolean
  max_participants?: number
  current_participants: number
  
  featured_image?: string
  gallery_images?: string[]
  video_url?: string
  
  meta_title_he?: string
  meta_title_en?: string
  meta_description_he?: string
  meta_description_en?: string
  
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  views: number
}

export interface UpcomingDate {
  date: string // ISO8601
  seats: number
  price?: number
}

export interface ActivityFilters {
  track?: string
  type?: string
  difficulty?: string
  minPrice?: number
  maxPrice?: number
  startDate?: string
  endDate?: string
  isOnline?: boolean
  isOnsite?: boolean
  search?: string
  sort?: 'newest' | 'popular' | 'price-asc' | 'price-desc'
}

export interface ActivityRegistration {
  id: string
  activity_id: string
  participant_name: string
  participant_email: string
  participant_phone: string
  participant_age?: number
  parent_name?: string
  parent_email?: string
  parent_phone?: string
  selected_date: string
  notes?: string
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_amount?: number
  payment_method?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
  updated_at: string
}
```

#### Blog Types
```typescript
// /src/types/blog.ts
export interface BlogPost {
  id: string
  created_at: string
  updated_at: string
  
  title_he: string
  title_en?: string
  slug: string
  excerpt_he: string
  excerpt_en?: string
  content_he: string
  content_en?: string
  
  category: string
  tags?: string[]
  
  author_id?: string
  featured_image: string
  
  reading_time?: number
  
  meta_title_he?: string
  meta_title_en?: string
  meta_description_he?: string
  meta_description_en?: string
  
  views: number
  
  status: 'draft' | 'published' | 'archived'
  published_at?: string
}

export interface BlogFilters {
  category?: string
  tags?: string[]
  author?: string
  search?: string
  sort?: 'newest' | 'popular' | 'trending' | 'oldest'
  featured?: boolean
}

export interface Comment {
  id: string
  post_id: string
  author: string
  email: string
  content: string
  rating?: number
  reply_to_id?: string
  created_at: string
  updated_at: string
  status: 'pending' | 'approved' | 'spam'
}

export interface TOCItem {
  level: number
  text: string
  slug: string
  children?: TOCItem[]
}
```

### 2. Query Utilities

```typescript
// /src/lib/activities/queries.ts
import { createServerSupabaseClient } from '@/lib/supabase'

export async function fetchActivities(filters: ActivityFilters, locale: string) {
  const supabase = await createServerSupabaseClient()
  let query = supabase
    .from('activities')
    .select(`
      *,
      instructors(id, name_he, name_en, profile_image)
    `, { count: 'exact' })
    .eq('status', 'published')
  
  // Apply filters
  if (filters.track) query = query.eq('track', filters.track)
  if (filters.type) query = query.eq('type', filters.type)
  if (filters.difficulty_level) {
    query = query.eq('difficulty_level', filters.difficulty_level)
  }
  if (filters.minPrice !== undefined) {
    query = query.gte('base_price', filters.minPrice)
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte('base_price', filters.maxPrice)
  }
  if (filters.isOnline) query = query.eq('is_online', true)
  if (filters.isOnsite) query = query.eq('is_onsite', true)
  if (filters.search) {
    query = query.or(
      `title_${locale}.ilike.%${filters.search}%,description_${locale}.ilike.%${filters.search}%`
    )
  }
  
  // Sort
  const sort = filters.sort || 'newest'
  switch (sort) {
    case 'popular':
      query = query.order('views', { ascending: false })
      break
    case 'price-asc':
      query = query.order('base_price', { ascending: true })
      break
    case 'price-desc':
      query = query.order('base_price', { ascending: false })
      break
    default: // newest
      query = query.order('published_at', { ascending: false })
  }
  
  const { data, error, count } = await query
  
  if (error) throw error
  return { activities: data, total: count }
}

export async function fetchActivityBySlug(slug: string, locale: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      instructors(*),
      activity_registrations(count),
      testimonials(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error) throw error
  return data
}

export async function fetchRelatedActivities(
  activityId: string,
  locale: string,
  limit = 3
) {
  const supabase = await createServerSupabaseClient()
  
  // Get current activity to find related ones
  const { data: current } = await supabase
    .from('activities')
    .select('track, tags')
    .eq('id', activityId)
    .single()
  
  if (!current) return []
  
  // Find activities with same track or overlapping tags
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('status', 'published')
    .neq('id', activityId)
    .or(`track.eq.${current.track},tags.cs.${JSON.stringify(current.tags)}`)
    .limit(limit)
  
  if (error) throw error
  return data
}
```

```typescript
// /src/lib/blog/queries.ts
export async function fetchBlogPosts(filters: BlogFilters, locale: string) {
  const supabase = await createServerSupabaseClient()
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      instructors(id, name_he, name_en, profile_image)
    `, { count: 'exact' })
    .eq('status', 'published')
  
  // Apply filters
  if (filters.category) query = query.eq('category', filters.category)
  if (filters.tags?.length) {
    query = query.contains('tags', filters.tags)
  }
  if (filters.author) query = query.eq('author_id', filters.author)
  if (filters.search) {
    query = query.or(
      `title_${locale}.ilike.%${filters.search}%,content_${locale}.ilike.%${filters.search}%`
    )
  }
  
  // Sort
  const sort = filters.sort || 'newest'
  switch (sort) {
    case 'popular':
      query = query.order('views', { ascending: false })
      break
    case 'trending':
      query = query.order('views', { ascending: false })
      break
    case 'oldest':
      query = query.order('published_at', { ascending: true })
      break
    default: // newest
      query = query.order('published_at', { ascending: false })
  }
  
  const { data, error, count } = await query
  
  if (error) throw error
  return { posts: data, total: count }
}

export async function fetchBlogPostBySlug(slug: string, locale: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      instructors(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error) throw error
  return data
}

export async function fetchBlogCategories(locale: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('category', { count: 'exact' })
    .eq('status', 'published')
  
  if (error) throw error
  
  // Group by category and count
  const categories = data?.reduce((acc, item) => {
    const existing = acc.find(c => c.value === item.category)
    if (existing) {
      existing.count++
    } else {
      acc.push({ value: item.category, count: 1 })
    }
    return acc
  }, [])
  
  return categories || []
}
```

### 3. Validation Schemas

```typescript
// /src/lib/activities/validation.ts
import { z } from 'zod'

export const RegistrationFormSchema = z.object({
  participantName: z.string().min(2, 'Name must be at least 2 characters'),
  participantEmail: z.string().email('Invalid email address'),
  participantPhone: z.string().regex(/^\+?[\d\s-]+$/, 'Invalid phone number'),
  participantAge: z.number().min(1).optional(),
  parentName: z.string().optional(),
  parentEmail: z.string().email().optional(),
  parentPhone: z.string().optional(),
  selectedDate: z.string().datetime('Invalid date'),
  notes: z.string().max(500).optional(),
  paymentMethod: z.enum(['credit-card', 'bank-transfer', 'paypal']),
  termsAccepted: z.boolean().refine(v => v === true, 'You must accept the terms')
})

export const ActivityFilterSchema = z.object({
  track: z.enum(['ai', 'kids', 'pro', 'edu', 'camp']).optional(),
  type: z.enum(['lecture', 'workshop', 'course', 'camp', 'event']).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isOnline: z.boolean().optional(),
  isOnsite: z.boolean().optional(),
  search: z.string().max(100).optional(),
  sort: z.enum(['newest', 'popular', 'price-asc', 'price-desc']).optional()
})
```

### 4. Middleware & Hooks

```typescript
// /src/lib/hooks/useActivityFilters.ts
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { ActivityFilterSchema } from '@/lib/activities/validation'

export function useActivityFilters(locale: string) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const filters = useMemo(() => {
    const params = Object.fromEntries(searchParams)
    return ActivityFilterSchema.parse(params)
  }, [searchParams])
  
  const updateFilters = useCallback(
    (newFilters: Partial<ActivityFilters>) => {
      const merged = { ...filters, ...newFilters }
      const params = new URLSearchParams()
      
      Object.entries(merged).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value))
        }
      })
      
      router.push(`?${params.toString()}`)
    },
    [filters, router]
  )
  
  return { filters, updateFilters }
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Create type definitions (activities.ts, blog.ts)
- [ ] Set up database query utilities
- [ ] Create reusable UI components (card, badge, price display)
- [ ] Set up API route structure
- [ ] Implement basic pagination

### Phase 2: Activities System (Week 2-3)
- [ ] Create activities listing page with filtering
- [ ] Implement single activity page
- [ ] Create registration form with validation
- [ ] Build prerequisite and learning outcomes displays
- [ ] Implement related activities carousel
- [ ] Add instructor profile cards
- [ ] Set up ISR for activity pages

### Phase 3: Blog System (Week 3-4)
- [ ] Set up MDX compilation pipeline
- [ ] Create blog listing page
- [ ] Implement single post page with MDX rendering
- [ ] Build table of contents generator
- [ ] Create author profile cards
- [ ] Implement blog filtering and search
- [ ] Add related posts carousel

### Phase 4: SEO & Performance (Week 4)
- [ ] Add structured data (JSON-LD)
- [ ] Implement dynamic Open Graph images
- [ ] Create sitemaps
- [ ] Optimize images and code splitting
- [ ] Set up analytics tracking
- [ ] Test Core Web Vitals

### Phase 5: Optional Enhancements (Week 5+)
- [ ] Comments system with moderation
- [ ] Full-text search (Algolia or similar)
- [ ] User authentication for registrations
- [ ] Email notifications
- [ ] Admin dashboard for content management
- [ ] Recommendation engine

---

## Database Optimization Tips

1. **Indexes**: All provided indexes are in schema (track, type, status, slug, published_at)
2. **Queries**: Use `.select()` to fetch only needed columns
3. **Pagination**: Always use limit/offset for large result sets
4. **Caching**: Implement ISR revalidation at appropriate intervals
5. **Aggregations**: Use database counts instead of fetching all records

## Security Considerations

1. **RLS Policies**: Already configured - public can only read published content
2. **Input Validation**: Use Zod schemas for all user inputs
3. **Rate Limiting**: Implement on API routes for registrations and comments
4. **CSRF Protection**: Use SameSite cookies
5. **SQL Injection**: Always use parameterized queries (Supabase handles this)

## Performance Targets

- Activities listing: < 1s (with filters)
- Single activity: < 800ms
- Blog listing: < 1s (with search)
- Single post: < 800ms
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

