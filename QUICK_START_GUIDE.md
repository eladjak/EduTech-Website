# Quick Start Implementation Guide

## Step-by-Step Setup

### 1. Create Type Definitions

**File: `/src/types/activities.ts`**
```typescript
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
  upcoming_dates: Array<{ date: string; seats: number; price?: number }>
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
  instructors?: {
    id: string
    name_he: string
    name_en?: string
    profile_image?: string
    title_he?: string
    title_en?: string
    bio_he?: string
    bio_en?: string
  }
}

export interface ActivityFilters {
  track?: string
  type?: string
  difficulty?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sort?: 'newest' | 'popular' | 'price-asc' | 'price-desc'
  page?: number
  limit?: number
}
```

**File: `/src/types/blog.ts`**
```typescript
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
  instructors?: {
    id: string
    name_he: string
    name_en?: string
    profile_image?: string
    bio_he?: string
    bio_en?: string
  }
}
```

---

### 2. Create Query Utilities

**File: `/src/lib/activities/queries.ts`**
```typescript
import { createServerSupabaseClient } from '@/lib/supabase'
import { Activity, ActivityFilters } from '@/types/activities'

export async function getActivities(
  filters: ActivityFilters = {},
  locale: string
) {
  const supabase = await createServerSupabaseClient()
  
  let query = supabase
    .from('activities')
    .select(
      `
      id,
      title_he,
      title_en,
      slug,
      description_he,
      description_en,
      excerpt_he,
      excerpt_en,
      track,
      type,
      difficulty_level,
      base_price,
      currency,
      discount_percentage,
      featured_image,
      duration_hours,
      current_participants,
      max_participants,
      is_online,
      is_onsite,
      published_at,
      views,
      instructors(id, name_he, name_en, profile_image)
      `,
      { count: 'exact' }
    )
    .eq('status', 'published')

  // Apply filters
  if (filters.track) {
    query = query.eq('track', filters.track)
  }
  
  if (filters.type) {
    query = query.eq('type', filters.type)
  }
  
  if (filters.difficulty) {
    query = query.eq('difficulty_level', filters.difficulty)
  }
  
  if (filters.minPrice !== undefined) {
    query = query.gte('base_price', filters.minPrice)
  }
  
  if (filters.maxPrice !== undefined) {
    query = query.lte('base_price', filters.maxPrice)
  }
  
  if (filters.search) {
    const titleField = locale === 'he' ? 'title_he' : 'title_en'
    const descField = locale === 'he' ? 'description_he' : 'description_en'
    query = query.or(
      `${titleField}.ilike.%${filters.search}%,${descField}.ilike.%${filters.search}%`
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
    default:
      query = query.order('published_at', { ascending: false })
  }

  // Pagination
  const page = filters.page || 1
  const limit = filters.limit || 12
  const offset = (page - 1) * limit
  
  const { data, error, count } = await query.range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching activities:', error)
    throw error
  }

  return {
    activities: (data as Activity[]) || [],
    total: count || 0,
    page,
    pageCount: Math.ceil((count || 0) / limit)
  }
}

export async function getActivityBySlug(slug: string, locale: string) {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('activities')
    .select(
      `
      *,
      instructors(*)
      `
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching activity:', error)
    throw error
  }

  return data as Activity
}

export async function getRelatedActivities(
  activityId: string,
  limit = 3
) {
  const supabase = await createServerSupabaseClient()
  
  // Get current activity
  const { data: current } = await supabase
    .from('activities')
    .select('track, tags')
    .eq('id', activityId)
    .single()

  if (!current) return []

  // Find related activities
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('status', 'published')
    .neq('id', activityId)
    .eq('track', current.track)
    .limit(limit)

  if (error) {
    console.error('Error fetching related activities:', error)
    return []
  }

  return (data as Activity[]) || []
}
```

**File: `/src/lib/blog/queries.ts`**
```typescript
import { createServerSupabaseClient } from '@/lib/supabase'
import { BlogPost } from '@/types/blog'

export async function getBlogPosts(filters: any = {}, locale: string) {
  const supabase = await createServerSupabaseClient()
  
  let query = supabase
    .from('blog_posts')
    .select(
      `
      id,
      title_he,
      title_en,
      slug,
      excerpt_he,
      excerpt_en,
      category,
      tags,
      featured_image,
      reading_time,
      views,
      published_at,
      instructors(id, name_he, name_en, profile_image)
      `,
      { count: 'exact' }
    )
    .eq('status', 'published')

  // Apply filters
  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  if (filters.search) {
    const titleField = locale === 'he' ? 'title_he' : 'title_en'
    const excerptField = locale === 'he' ? 'excerpt_he' : 'excerpt_en'
    query = query.or(
      `${titleField}.ilike.%${filters.search}%,${excerptField}.ilike.%${filters.search}%`
    )
  }

  // Sort
  const sort = filters.sort || 'newest'
  switch (sort) {
    case 'popular':
      query = query.order('views', { ascending: false })
      break
    case 'oldest':
      query = query.order('published_at', { ascending: true })
      break
    default:
      query = query.order('published_at', { ascending: false })
  }

  // Pagination
  const page = filters.page || 1
  const limit = filters.limit || 10
  const offset = (page - 1) * limit

  const { data, error, count } = await query.range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }

  return {
    posts: (data as BlogPost[]) || [],
    total: count || 0,
    page,
    pageCount: Math.ceil((count || 0) / limit)
  }
}

export async function getBlogPostBySlug(slug: string, locale: string) {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select(
      `
      *,
      instructors(*)
      `
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }

  return data as BlogPost
}
```

---

### 3. Create API Routes

**File: `/src/app/api/activities/route.ts`**
```typescript
import { getActivities } from '@/lib/activities/queries'
import { ActivityFilterSchema } from '@/lib/activities/validation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const locale = request.headers.get('accept-language') || 'he'
    
    // Parse and validate filters
    const filters = ActivityFilterSchema.parse({
      track: searchParams.get('track') || undefined,
      type: searchParams.get('type') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      search: searchParams.get('search') || undefined,
      sort: searchParams.get('sort') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 12
    })

    const result = await getActivities(filters, locale)
    
    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}
```

**File: `/src/app/api/posts/route.ts`**
```typescript
import { getBlogPosts } from '@/lib/blog/queries'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const locale = request.headers.get('accept-language') || 'he'
    
    const filters = {
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      sort: searchParams.get('sort') || 'newest',
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10
    }

    const result = await getBlogPosts(filters, locale)
    
    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
```

---

### 4. Create Page Components

**File: `/src/app/[locale]/activities/page.tsx`**
```typescript
import { getActivities } from '@/lib/activities/queries'
import { ActivityCard } from '@/components/activities/ActivityCard'
import { ActivityFilters } from '@/components/activities/ActivityFilters'
import { Pagination } from '@/components/shared/Pagination'
import { Suspense } from 'react'
import { useTranslations } from 'next-intl'

async function ActivitiesList({ 
  locale, 
  filters 
}: { 
  locale: string
  filters: Record<string, string>
}) {
  const { activities, total, page, pageCount } = await getActivities(
    {
      track: filters.track,
      type: filters.type,
      difficulty: filters.difficulty,
      minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
      search: filters.search,
      sort: filters.sort as any,
      page: filters.page ? parseInt(filters.page) : 1
    },
    locale
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
            locale={locale} 
          />
        ))}
      </div>
      
      {pageCount > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={pageCount} 
          total={total}
        />
      )}
    </div>
  )
}

export default function ActivitiesPage({
  params: { locale },
  searchParams
}: {
  params: { locale: string }
  searchParams: Record<string, string>
}) {
  const t = useTranslations('activities')

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <ActivityFilters 
            locale={locale} 
            searchParams={searchParams}
          />
          
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading...</div>}>
              <ActivitiesList locale={locale} filters={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**File: `/src/app/[locale]/activities/[slug]/page.tsx`**
```typescript
import { getActivityBySlug, getRelatedActivities } from '@/lib/activities/queries'
import { ActivityDetails } from '@/components/activities/ActivityDetails'
import { RelatedActivities } from '@/components/activities/RelatedActivities'
import { RegistrationForm } from '@/components/activities/RegistrationForm'
import { ActivityStructuredData } from '@/components/activities/ActivityStructuredData'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const activity = await getActivityBySlug(slug, locale)
  
  if (!activity) return {}

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
    }
  }
}

export default async function ActivityPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const activity = await getActivityBySlug(slug, locale)
  
  if (!activity) {
    notFound()
  }

  const relatedActivities = await getRelatedActivities(activity.id)

  return (
    <div className="min-h-screen bg-background">
      <ActivityStructuredData activity={activity} locale={locale} />
      
      <div className="container py-12">
        <ActivityDetails activity={activity} locale={locale} />
        
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {relatedActivities.length > 0 && (
              <RelatedActivities 
                activities={relatedActivities} 
                locale={locale} 
              />
            )}
          </div>
          
          <div>
            <RegistrationForm activity={activity} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

**File: `/src/app/[locale]/blog/page.tsx`**
```typescript
import { getBlogPosts } from '@/lib/blog/queries'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogFilters } from '@/components/blog/BlogFilters'
import { Pagination } from '@/components/shared/Pagination'
import { Suspense } from 'react'
import { useTranslations } from 'next-intl'

async function BlogList({ 
  locale, 
  filters 
}: { 
  locale: string
  filters: Record<string, string>
}) {
  const { posts, total, page, pageCount } = await getBlogPosts(
    {
      category: filters.category,
      search: filters.search,
      sort: filters.sort || 'newest',
      page: filters.page ? parseInt(filters.page) : 1
    },
    locale
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard 
            key={post.id} 
            post={post} 
            locale={locale} 
          />
        ))}
      </div>
      
      {pageCount > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={pageCount} 
          total={total}
        />
      )}
    </div>
  )
}

export default function BlogPage({
  params: { locale },
  searchParams
}: {
  params: { locale: string }
  searchParams: Record<string, string>
}) {
  const t = useTranslations('blog')

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <BlogFilters 
            locale={locale} 
            searchParams={searchParams}
          />
          
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading...</div>}>
              <BlogList locale={locale} filters={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

### 5. Environment Variables

**Add to `.env.local`:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## Component Examples

### Activity Card Component

**File: `/src/components/activities/ActivityCard.tsx`**
```typescript
'use client'

import { Activity } from '@/types/activities'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface ActivityCardProps {
  activity: Activity
  locale: string
}

export function ActivityCard({ activity, locale }: ActivityCardProps) {
  const t = useTranslations('activities')
  const title = activity[`title_${locale}`]
  const excerpt = activity[`excerpt_${locale}`]

  return (
    <Link href={`/${locale}/activities/${activity.slug}`}>
      <div className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
        {activity.featured_image && (
          <div className="relative h-48 overflow-hidden bg-muted">
            <Image
              src={activity.featured_image}
              alt={title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100" />
          </div>
        )}
        
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {activity.track}
            </span>
            {activity.difficulty_level && (
              <span className="text-xs text-muted-foreground">
                {activity.difficulty_level}
              </span>
            )}
          </div>
          
          <h3 className="font-semibold line-clamp-2">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            {activity.base_price && (
              <div className="text-lg font-bold">
                ₪{activity.base_price}
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              {activity.duration_hours}h
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
```

---

## Implementation Checklist

- [ ] Create type definitions
- [ ] Set up query utilities
- [ ] Create API routes
- [ ] Build page components
- [ ] Create card components
- [ ] Build filter components
- [ ] Create registration form
- [ ] Implement blog components
- [ ] Add MDX support
- [ ] Set up SEO metadata
- [ ] Add structured data
- [ ] Implement ISR
- [ ] Test filtering and search
- [ ] Test responsive design
- [ ] Optimize images
- [ ] Add error handling
- [ ] Deploy to production

---

## Common Issues & Solutions

### Issue: "Cannot find module @/lib/activities/queries"
**Solution**: Ensure file exists and path alias is configured in `tsconfig.json`

### Issue: Images not loading from Supabase
**Solution**: Add Supabase domain to `next.config.js` remotePatterns

### Issue: Locale not being passed correctly
**Solution**: Ensure middleware is configured and locale is extracted from params

### Issue: Slow API responses
**Solution**: Add caching headers, implement pagination, optimize queries

---

## Performance Tips

1. Use ISR for high-traffic pages
2. Implement image optimization
3. Use suspense boundaries for slow components
4. Implement pagination for large datasets
5. Cache API responses with appropriate TTL
6. Use dynamic imports for heavy components

