# Complete Files Checklist for Implementation

## Overview
This checklist includes all files that need to be created to implement the Activities and Blog systems. Use this as your implementation reference.

---

## Phase 1: Type Definitions & Infrastructure

### Core Type Files
- [ ] `/src/types/activities.ts` - Activity and filter types
- [ ] `/src/types/blog.ts` - BlogPost and filter types
- [ ] `/src/types/api.ts` - API response types
- [ ] `/src/types/registrations.ts` - Registration-related types

### Validation Schemas
- [ ] `/src/lib/activities/validation.ts` - Activity filter and registration schemas
- [ ] `/src/lib/blog/validation.ts` - Blog filter and comment schemas

### Error Handling
- [ ] `/src/lib/utils/error.ts` - Custom error classes

---

## Phase 2: Query & Data Layer

### Activity Queries
- [ ] `/src/lib/activities/queries.ts` - Database queries for activities
- [ ] `/src/lib/activities/transformers.ts` - Data transformations
- [ ] `/src/lib/activities/filters.ts` - Filter building logic

### Blog Queries
- [ ] `/src/lib/blog/queries.ts` - Database queries for blog posts
- [ ] `/src/lib/blog/transformers.ts` - Data transformations
- [ ] `/src/lib/blog/mdx.ts` - MDX compilation and processing
- [ ] `/src/lib/blog/toc.ts` - Table of contents generation
- [ ] `/src/lib/blog/reading-time.ts` - Reading time calculation

### Utilities
- [ ] `/src/lib/utils/dates.ts` - Date formatting utilities
- [ ] `/src/lib/utils/currency.ts` - Currency and number formatting
- [ ] `/src/lib/utils/slugs.ts` - Slug generation
- [ ] `/src/lib/utils/strings.ts` - String manipulation utilities

---

## Phase 3: Custom Hooks

### Activity Hooks
- [ ] `/src/lib/hooks/useActivityFilters.ts` - Activity filter state hook
- [ ] `/src/lib/hooks/useActivityRegistration.ts` - Registration form hook
- [ ] `/src/lib/hooks/useActivitySearch.ts` - Search functionality hook

### Blog Hooks
- [ ] `/src/lib/hooks/useBlogFilters.ts` - Blog filter state hook
- [ ] `/src/lib/hooks/useBlogSearch.ts` - Blog search hook

### Shared Hooks
- [ ] `/src/lib/hooks/usePagination.ts` - Pagination state hook
- [ ] `/src/lib/hooks/useDebounce.ts` - Debounce hook

---

## Phase 4: API Routes

### Activities API
- [ ] `/src/app/api/activities/route.ts` - GET activities list
- [ ] `/src/app/api/activities/[slug]/route.ts` - GET single activity
- [ ] `/src/app/api/activities/related/route.ts` - GET related activities
- [ ] `/src/app/api/activities/search/route.ts` - POST search activities

### Registrations API
- [ ] `/src/app/api/registrations/route.ts` - POST registration
- [ ] `/src/app/api/registrations/[id]/route.ts` - GET/PATCH registration

### Blog API
- [ ] `/src/app/api/posts/route.ts` - GET blog posts list
- [ ] `/src/app/api/posts/[slug]/route.ts` - GET single post
- [ ] `/src/app/api/posts/search/route.ts` - POST search posts
- [ ] `/src/app/api/posts/featured/route.ts` - GET featured posts

### Comments API
- [ ] `/src/app/api/comments/route.ts` - POST comment
- [ ] `/src/app/api/comments/[id]/route.ts` - DELETE comment

### Metadata API
- [ ] `/src/app/api/categories/route.ts` - GET blog categories with counts

---

## Phase 5: Page Components

### Activities Pages
- [ ] `/src/app/[locale]/activities/page.tsx` - Listing page
- [ ] `/src/app/[locale]/activities/layout.tsx` - Activities layout
- [ ] `/src/app/[locale]/activities/[slug]/page.tsx` - Detail page
- [ ] `/src/app/[locale]/activities/[slug]/layout.tsx` - Detail layout
- [ ] `/src/app/[locale]/activities/error.tsx` - Error boundary

### Blog Pages
- [ ] `/src/app/[locale]/blog/page.tsx` - Listing page
- [ ] `/src/app/[locale]/blog/layout.tsx` - Blog layout
- [ ] `/src/app/[locale]/blog/[slug]/page.tsx` - Detail page
- [ ] `/src/app/[locale]/blog/[slug]/layout.tsx` - Detail layout
- [ ] `/src/app/[locale]/blog/category/[category]/page.tsx` - Category page
- [ ] `/src/app/[locale]/blog/tag/[tag]/page.tsx` - Tag page
- [ ] `/src/app/[locale]/blog/error.tsx` - Error boundary

---

## Phase 6: Shared Components

### Layout Components
- [ ] `/src/components/shared/Pagination.tsx` - Pagination controls
- [ ] `/src/components/shared/LoadingSpinner.tsx` - Loading indicator
- [ ] `/src/components/shared/LoadingSkeletons.tsx` - Skeleton loaders
- [ ] `/src/components/shared/EmptyState.tsx` - Empty state display
- [ ] `/src/components/shared/ErrorDisplay.tsx` - Error message display

### Form Components
- [ ] `/src/components/shared/FormField.tsx` - Reusable form field
- [ ] `/src/components/shared/Select.tsx` - Select dropdown
- [ ] `/src/components/shared/DatePicker.tsx` - Date picker component
- [ ] `/src/components/shared/PriceRange.tsx` - Price range slider

### Display Components
- [ ] `/src/components/shared/Badge.tsx` - Badge component
- [ ] `/src/components/shared/Card.tsx` - Card wrapper
- [ ] `/src/components/shared/Image.tsx` - Optimized image wrapper
- [ ] `/src/components/shared/Tag.tsx` - Tag display
- [ ] `/src/components/shared/Icon.tsx` - Icon wrapper

### SEO Components
- [ ] `/src/components/shared/MetaTags.tsx` - Dynamic meta tags
- [ ] `/src/components/shared/StructuredData.tsx` - JSON-LD wrapper

---

## Phase 7: Activity Components (15+)

### Listing Components
- [ ] `/src/components/activities/ActivitiesGrid.tsx` - Grid layout
- [ ] `/src/components/activities/ActivityCard.tsx` - Card component
- [ ] `/src/components/activities/ActivityCardSkeleton.tsx` - Loading skeleton

### Filter Components
- [ ] `/src/components/activities/ActivityFilters.tsx` - Filter sidebar
- [ ] `/src/components/activities/FilterChips.tsx` - Active filters display
- [ ] `/src/components/activities/TrackFilter.tsx` - Track filter
- [ ] `/src/components/activities/TypeFilter.tsx` - Type filter
- [ ] `/src/components/activities/DifficultyFilter.tsx` - Difficulty filter
- [ ] `/src/components/activities/PriceFilter.tsx` - Price range filter
- [ ] `/src/components/activities/AvailabilityFilter.tsx` - Availability filter

### Detail Components
- [ ] `/src/components/activities/ActivityDetails.tsx` - Main detail view
- [ ] `/src/components/activities/ActivityHero.tsx` - Hero section
- [ ] `/src/components/activities/ActivityMeta.tsx` - Metadata display
- [ ] `/src/components/activities/ActivityContent.tsx` - Rich content area

### Information Components
- [ ] `/src/components/activities/InstructorCard.tsx` - Instructor info
- [ ] `/src/components/activities/PrerequisitesDisplay.tsx` - Prerequisites
- [ ] `/src/components/activities/LearningOutcomes.tsx` - Learning outcomes
- [ ] `/src/components/activities/TechnologiesUsed.tsx` - Technology stack
- [ ] `/src/components/activities/UpcomingDates.tsx` - Date selector

### Registration Components
- [ ] `/src/components/activities/RegistrationForm.tsx` - Multi-step form
- [ ] `/src/components/activities/RegistrationStep1.tsx` - Participant info
- [ ] `/src/components/activities/RegistrationStep2.tsx` - Parent info
- [ ] `/src/components/activities/RegistrationStep3.tsx` - Date selection
- [ ] `/src/components/activities/RegistrationStep4.tsx` - Payment info
- [ ] `/src/components/activities/RegistrationStep5.tsx` - Confirmation
- [ ] `/src/components/activities/PaymentInfo.tsx` - Price breakdown

### Engagement Components
- [ ] `/src/components/activities/RelatedActivities.tsx` - Related carousel
- [ ] `/src/components/activities/ReviewsSection.tsx` - Testimonials
- [ ] `/src/components/activities/ShareActivity.tsx` - Social sharing
- [ ] `/src/components/activities/ActivityStructuredData.tsx` - JSON-LD

### Utility Components
- [ ] `/src/components/activities/PriceDisplay.tsx` - Price formatting
- [ ] `/src/components/activities/DifficultyBadge.tsx` - Difficulty badge
- [ ] `/src/components/activities/TrackBadge.tsx` - Track badge
- [ ] `/src/components/activities/AvailabilityStatus.tsx` - Availability indicator

---

## Phase 8: Blog Components (12+)

### Listing Components
- [ ] `/src/components/blog/BlogGrid.tsx` - Grid layout
- [ ] `/src/components/blog/BlogCard.tsx` - Card component
- [ ] `/src/components/blog/BlogCardSkeleton.tsx` - Loading skeleton
- [ ] `/src/components/blog/FeaturedPost.tsx` - Featured post display

### Filter Components
- [ ] `/src/components/blog/BlogFilters.tsx` - Filter sidebar
- [ ] `/src/components/blog/CategoryFilter.tsx` - Category filter
- [ ] `/src/components/blog/TagFilter.tsx` - Tag filter
- [ ] `/src/components/blog/SearchFilter.tsx` - Search input
- [ ] `/src/components/blog/SortOptions.tsx` - Sort dropdown

### Sidebar Components
- [ ] `/src/components/blog/BlogSidebar.tsx` - Sidebar layout
- [ ] `/src/components/blog/CategoriesList.tsx` - Category list
- [ ] `/src/components/blog/PopularPosts.tsx` - Popular posts
- [ ] `/src/components/blog/TagCloud.tsx` - Tag cloud display
- [ ] `/src/components/blog/NewsletterForm.tsx` - Newsletter signup

### Post Components
- [ ] `/src/components/blog/PostContent.tsx` - MDX rendered content
- [ ] `/src/components/blog/PostHeader.tsx` - Header section
- [ ] `/src/components/blog/PostMeta.tsx` - Date/author info

### Navigation Components
- [ ] `/src/components/blog/TableOfContents.tsx` - Auto TOC
- [ ] `/src/components/blog/ReadingTimeEstimate.tsx` - Reading time
- [ ] `/src/components/blog/ScrollProgress.tsx` - Scroll progress bar

### Author Components
- [ ] `/src/components/blog/AuthorCard.tsx` - Author info
- [ ] `/src/components/blog/AuthorBio.tsx` - Author biography

### Engagement Components
- [ ] `/src/components/blog/RelatedPosts.tsx` - Related posts carousel
- [ ] `/src/components/blog/CommentsSection.tsx` - Comments display
- [ ] `/src/components/blog/CommentForm.tsx` - Comment submission
- [ ] `/src/components/blog/SharePost.tsx` - Social sharing
- [ ] `/src/components/blog/PostStructuredData.tsx` - JSON-LD

### Utility Components
- [ ] `/src/components/blog/CategoryBadge.tsx` - Category badge
- [ ] `/src/components/blog/TagBadge.tsx` - Tag badge

---

## Phase 9: SEO & Metadata

### SEO Utilities
- [ ] `/src/lib/seo/metadata.ts` - Metadata generation
- [ ] `/src/lib/seo/og-images.ts` - Open Graph image generation
- [ ] `/src/lib/seo/structured-data.ts` - JSON-LD schemas
- [ ] `/src/lib/seo/sitemap.ts` - Sitemap generation

### Sitemap Files
- [ ] `/src/app/sitemap.ts` - Main sitemap (extend existing)
- [ ] `/src/app/[locale]/activities/sitemap.ts` - Activities sitemap
- [ ] `/src/app/[locale]/blog/sitemap.ts` - Blog sitemap

### OpenGraph Images
- [ ] `/src/app/[locale]/activities/[slug]/opengraph-image.tsx` - Activity OG
- [ ] `/src/app/[locale]/blog/[slug]/opengraph-image.tsx` - Blog OG

---

## Phase 10: Configuration & Messages

### Configuration
- [ ] Update `/src/env.js` - Add new environment variables
- [ ] Update `/next.config.js` - Configure Supabase image domain
- [ ] Update `/tsconfig.json` - Verify path aliases

### Internationalization Messages
- [ ] `/messages/he.json` - Hebrew translations (add activity/blog keys)
- [ ] `/messages/en.json` - English translations (add activity/blog keys)

---

## Phase 11: Testing Files (Optional)

### Unit Tests
- [ ] `/src/lib/activities/__tests__/queries.test.ts`
- [ ] `/src/lib/activities/__tests__/transformers.test.ts`
- [ ] `/src/lib/blog/__tests__/queries.test.ts`
- [ ] `/src/lib/utils/__tests__/currency.test.ts`
- [ ] `/src/lib/utils/__tests__/dates.test.ts`

### Component Tests
- [ ] `/src/components/activities/__tests__/ActivityCard.test.tsx`
- [ ] `/src/components/blog/__tests__/BlogCard.test.tsx`

### E2E Tests
- [ ] `/e2e/activities.spec.ts` - Activity flow tests
- [ ] `/e2e/blog.spec.ts` - Blog flow tests

---

## File Creation Priority

### Must Create First (Day 1)
1. Type definitions (types/activities.ts, types/blog.ts)
2. Validation schemas
3. Query utilities

### Create Second (Day 2-3)
4. Error handling utilities
5. Transformation utilities
6. Custom hooks

### Create Third (Day 3-4)
7. API routes
8. Shared components
9. Activity components

### Create Fourth (Day 4-5)
10. Blog components
11. SEO components
12. Page components

### Final Polish (Day 5-6)
13. Translations
14. Tests
15. Documentation updates

---

## Total Files to Create

- **Type Files**: 4
- **Validation Files**: 2
- **Query Files**: 6
- **Utility Files**: 10
- **Hook Files**: 7
- **API Routes**: 11
- **Page Components**: 13
- **Shared Components**: 15
- **Activity Components**: 24
- **Blog Components**: 22
- **SEO Files**: 7
- **Configuration**: 3
- **Test Files**: 8
- **Messages**: 2 (updates to existing)

**Grand Total: 134 files**

---

## Implementation Notes

### Color Coding
- Red: Critical path items (must do)
- Yellow: High priority (should do)
- Green: Optional enhancements (nice to have)

### Dependencies Between Files
- Types must be created before queries
- Queries must be created before API routes
- API routes must be created before page components
- Shared components must be created before specific components

### Testing Strategy
- Unit test utilities first
- Then test API routes
- Then test components
- Finally E2E testing

---

## File Size Estimates

| Category | Files | Avg Size | Total |
|----------|-------|----------|-------|
| Types | 4 | 2 KB | 8 KB |
| Validation | 2 | 3 KB | 6 KB |
| Queries | 6 | 4 KB | 24 KB |
| Utilities | 10 | 2 KB | 20 KB |
| Hooks | 7 | 2.5 KB | 17.5 KB |
| API Routes | 11 | 2 KB | 22 KB |
| Pages | 13 | 3 KB | 39 KB |
| Shared Components | 15 | 2 KB | 30 KB |
| Activity Components | 24 | 2.5 KB | 60 KB |
| Blog Components | 22 | 2.5 KB | 55 KB |
| SEO/Config | 10 | 1.5 KB | 15 KB |

**Total Codebase Addition: ~297 KB**

---

## Version Control Strategy

### Recommended Branch Names
- `feature/activities-system` - For activities feature
- `feature/blog-system` - For blog feature
- `feature/seo-optimization` - For SEO enhancements
- `feature/payments-integration` - For payment processing

### Commit Message Pattern
```
feat: Add [feature name]
docs: Add [documentation]
test: Add tests for [feature]
refactor: Improve [component/utility]
fix: Fix [issue]
```

---

## Next Steps After File Creation

1. Update middleware for blog routes
2. Create admin components for content management
3. Set up database seeding scripts
4. Create migration guides
5. Set up monitoring and analytics
6. Configure payment processing
7. Set up email notifications

