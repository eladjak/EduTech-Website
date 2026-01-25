# Design System Refactoring Checklist

## Phase 1: Foundation (Week 1) - CRITICAL

### Type System Setup
- [ ] Create `/src/types/index.ts`
  - [ ] Export `type TrackId = "ai" | "kids" | "pro" | "edu" | "camp"`
  - [ ] Export `interface Activity { id, slug, image, duration, participants, startDate }`
  - [ ] Export `interface Testimonial { id, name_he, name_en, role_he, role_en, content_he, content_en, rating, image }`
  - [ ] Export `interface NavItem { href, label }`
  - [ ] Export `interface SocialLink { icon, href, label, color }`

### Configuration Centralization
- [ ] Create `/src/constants/trackConfig.ts`
  - [ ] Define `TRACK_CONFIG` with all track data (colors, icons, labels)
  - [ ] Include: light gradient, dark gradient, hover state, background color, text color
  - [ ] Include: icon components (Cpu, Users, Code, GraduationCap, Tent)
  - [ ] Create export for `type TrackId = keyof typeof TRACK_CONFIG`
  
- [ ] Create `/src/constants/navigation.ts`
  - [ ] Define `NAV_ITEMS` array
  - [ ] Define `SOCIAL_LINKS` array
  - [ ] Define `LEGAL_LINKS` array

- [ ] Create `/src/constants/mockData.ts`
  - [ ] Export activities by track
  - [ ] Export testimonials by track
  - [ ] Include all titles and descriptions (English & Hebrew)

### Code Deduplication - Part 1
- [ ] Extract `ActivityCard` component
  - [ ] File: `/src/components/ui/ActivityCard.tsx`
  - [ ] Props: activity, title, showBadge?, showDescription?, description?, trackColor?
  - [ ] Update ActivitiesSection.tsx to use ActivityCard
  - [ ] Update TrackActivities.tsx to use ActivityCard
  - [ ] Delete duplicate code (~80 lines saved)

- [ ] Extract `TestimonialCard` component
  - [ ] File: `/src/components/ui/TestimonialCard.tsx`
  - [ ] Props: testimonial, name, role, content
  - [ ] Update TestimonialsSection.tsx to use TestimonialCard
  - [ ] Update TrackTestimonials.tsx to use TestimonialCard
  - [ ] Delete duplicate code (~70 lines saved)

### i18n Cleanup
- [ ] Move hardcoded strings to translation files
  - [ ] Footer: `"נרשמת בהצלחה לניוזלטר!"` → i18n key
  - [ ] Footer: `"משהו השתבש"` → i18n key
  - [ ] ContactInfo: `"עקבו אחרינו"` → i18n key
  - [ ] Update NavigationMenu.tsx to use i18n (currently hardcoded)

### Notification System
- [ ] Install toast notification library
  - [ ] Recommended: `npm install sonner` or `npm install react-toastify`
  
- [ ] Create `/src/components/ui/Toast.tsx` (if needed) or use library directly
  
- [ ] Update Footer.tsx
  - [ ] Replace `alert("נרשמת בהצלחה...")` with toast.success()
  - [ ] Replace error alerts with toast.error()
  - [ ] Add error message display from API response
  
- [ ] Update ContactForm.tsx
  - [ ] Replace `alert()` calls with toast notifications
  - [ ] Display specific error messages

---

## Phase 2: UI Components (Week 2) - HIGH PRIORITY

### Missing Base Components
- [ ] Create `/src/components/ui/Card.tsx`
  - [ ] Props: children, className, variant?, shadow?
  - [ ] Base styling: bg-white, rounded-xl, shadow-lg
  
- [ ] Create `/src/components/ui/Badge.tsx`
  - [ ] Props: children, variant?, track?
  - [ ] Support all track colors
  
- [ ] Create `/src/components/ui/IconButton.tsx`
  - [ ] Props: icon, onClick, aria-label, size?, variant?
  - [ ] Use for Header language switcher, mobile menu button
  
- [ ] Create `/src/components/ui/FormField.tsx`
  - [ ] Props: label, id, type, value, onChange, error?, required?
  - [ ] Wraps input + label + error message
  - [ ] Replaces repeated form field code in ContactForm

### Code Deduplication - Part 2
- [ ] Create `/src/components/ui/SocialLinks.tsx`
  - [ ] Props: links, direction?, size?, layout?
  - [ ] Use in: Footer, ContactInfo, potentially Header
  - [ ] Replaces duplicated social links rendering

- [ ] Update Header.tsx
  - [ ] Use IconButton for language switcher
  - [ ] Use IconButton for mobile menu button
  - [ ] Import TRACK_CONFIG instead of hardcoding colors
  - [ ] Update subBrands data to use constants

- [ ] Update Footer.tsx
  - [ ] Use SocialLinks component for social icons
  - [ ] Use FormField component for newsletter input
  - [ ] Use IconButton for social links

- [ ] Update ContactInfo.tsx
  - [ ] Use SocialLinks component
  - [ ] Remove hardcoded social links array

- [ ] Update ActivitiesSection.tsx
  - [ ] Import trackConfig instead of hardcoded colors
  
- [ ] Update SubBrandsSection.tsx
  - [ ] Import TRACK_CONFIG instead of hardcoded subBrands
  
- [ ] Update TrackHero.tsx
  - [ ] Import TRACK_CONFIG for gradients and icons

### Styling Consistency
- [ ] Audit form input styling
  - [ ] Standardize all inputs to same styling pattern
  - [ ] Create consistent focus states (ring or border?)
  - [ ] Create consistent padding (py-2 or py-3?)

- [ ] Audit button styling
  - [ ] Update TrackHero buttons to use Button component variants
  - [ ] Update ContactForm button to use Button component
  - [ ] Update Footer button to use Button component

- [ ] Create icon container variants in utility classes
  - [ ] Define 3-4 consistent icon container patterns
  - [ ] Update all components to use standardized patterns

---

## Phase 3: Accessibility (Week 2-3) - MEDIUM PRIORITY

### ARIA & Semantics
- [ ] Header.tsx
  - [ ] Add `aria-expanded` to tracks dropdown
  - [ ] Add `aria-current="page"` to active nav links
  - [ ] Test keyboard navigation (Tab, Escape)

- [ ] Footer.tsx & ContactInfo.tsx
  - [ ] Verify all social icons have proper aria-label

- [ ] ContactForm.tsx
  - [ ] Add `aria-invalid` to error fields
  - [ ] Add `aria-describedby` linking to error messages
  - [ ] Add proper form field associations

- [ ] TrackHero.tsx
  - [ ] Add `aria-label` to CTA buttons

### Form Validation & UX
- [ ] Replace ContactForm basic validation
  - [ ] Install: `npm install react-hook-form zod`
  - [ ] Implement full form validation with Zod
  - [ ] Add inline error messages (not alerts)
  - [ ] Add success toast instead of alert
  - [ ] Add loading state during submission

- [ ] Update Footer newsletter form
  - [ ] Add email validation
  - [ ] Add inline error display
  - [ ] Add loading state

### Accessibility Features
- [ ] Add prefers-reduced-motion support
  - [ ] Create `useReducedMotion` hook
  - [ ] Update all Framer Motion animations to check preference
  - [ ] Disable animations when `prefers-reduced-motion: reduce`

- [ ] Color contrast audit
  - [ ] Test: gray-600 on white background
  - [ ] Test: gray-300 on gray-900 (footer text)
  - [ ] Test: white text on gradient backgrounds
  - [ ] Use: WebAIM Color Contrast Checker

- [ ] Add skip links (optional for Phase 2)
  - [ ] Add "Skip to main content" link
  - [ ] Hidden by default, visible on Tab

---

## Phase 4: Polish & Documentation (Week 3) - MEDIUM PRIORITY

### Component Organization
- [ ] Create `/src/components/index.ts`
  ```tsx
  // Re-exports for easier imports
  export { Button } from './ui/Button';
  export { Section } from './ui/Section';
  export { Card } from './ui/Card';
  // ... all components
  ```

- [ ] Organize components directory
  - [ ] Consider reorganizing if it grows further
  - [ ] Current structure is good for current size

### Hooks & Utilities
- [ ] Create `/src/hooks/useTrackConfig.ts`
  - [ ] Hook that returns track data by ID
  - [ ] Use throughout instead of importing config directly

- [ ] Create `/src/hooks/useFormState.ts`
  - [ ] Reusable form state management
  - [ ] Handles loading, error, success states

- [ ] Create `/src/hooks/useLocalizedContent.ts`
  - [ ] Handles i18n + RTL logic
  - [ ] Centralizes locale-based rendering

### Documentation
- [ ] Add JSDoc comments to all exported components
  ```tsx
  /**
   * Button component with multiple variants
   * @param variant - Visual style variant
   * @param size - Button size
   * @param asChild - Use different element via Slot
   */
  ```

- [ ] Create Storybook setup (optional for Phase 3)
  - [ ] `npm install -D storybook`
  - [ ] Create stories for Button, Card, Badge, etc.

- [ ] Create COMPONENT_GUIDE.md
  - [ ] Document all components
  - [ ] Include usage examples
  - [ ] Document props and variants

---

## Phase 5: Advanced Features (Week 4+) - LOW PRIORITY

### Error Handling
- [ ] Create Error Boundary component
- [ ] Add global error page
- [ ] Add form error handling UI

### Loading States
- [ ] Create Skeleton component
- [ ] Add skeleton screens to async sections
- [ ] Create loading spinner component

### Performance
- [ ] Audit Framer Motion bundle impact
- [ ] Check font loading (Heebo, Assistant)
- [ ] Add explicit Image lazy loading
- [ ] Memoize expensive components

### Analytics & Tracking
- [ ] Setup analytics library
- [ ] Track user interactions
- [ ] Track form submissions

### CMS Integration Prep
- [ ] Extract content interfaces
- [ ] Design CMS data structure
- [ ] Prepare for dynamic content

---

## Testing Checklist

- [ ] Unit tests for extracted components
  - [ ] ActivityCard.tsx
  - [ ] TestimonialCard.tsx
  - [ ] Button variants

- [ ] Integration tests
  - [ ] Form submission flow
  - [ ] Navigation and routing
  - [ ] i18n switching

- [ ] Accessibility tests
  - [ ] Keyboard navigation (Tab, Arrow keys, Escape)
  - [ ] Screen reader testing
  - [ ] Color contrast
  - [ ] Focus indicators

- [ ] Performance tests
  - [ ] Lighthouse scores
  - [ ] Bundle size
  - [ ] Animation performance on mobile

---

## Metrics to Track

### Before Refactoring
- [ ] Total LOC: `~3000` (estimate)
- [ ] Components: 16
- [ ] Duplicated LOC: ~300
- [ ] TypeScript coverage: 7/10
- [ ] Accessibility score: 6/10
- [ ] Bundle size: (measure with `npm analyze`)

### Target After Refactoring
- [ ] Total LOC: `~2850` (after deduplication)
- [ ] Components: 24 (new shared components)
- [ ] Duplicated LOC: <20
- [ ] TypeScript coverage: 9/10
- [ ] Accessibility score: 8/10
- [ ] Bundle size: -15-20% (remove duplicates)

---

## Files to Create (Summary)

### Types
- [ ] `/src/types/index.ts` - All shared types

### Constants
- [ ] `/src/constants/trackConfig.ts` - Track configuration
- [ ] `/src/constants/navigation.ts` - Navigation data
- [ ] `/src/constants/mockData.ts` - Mock data

### UI Components (New)
- [ ] `/src/components/ui/Card.tsx`
- [ ] `/src/components/ui/Badge.tsx`
- [ ] `/src/components/ui/IconButton.tsx`
- [ ] `/src/components/ui/FormField.tsx`
- [ ] `/src/components/ui/ActivityCard.tsx` (extract)
- [ ] `/src/components/ui/TestimonialCard.tsx` (extract)
- [ ] `/src/components/ui/SocialLinks.tsx` (extract)

### Hooks (New)
- [ ] `/src/hooks/useTrackConfig.ts`
- [ ] `/src/hooks/useFormState.ts`
- [ ] `/src/hooks/useLocalizedContent.ts`
- [ ] `/src/hooks/useReducedMotion.ts` (a11y)

### Files to Modify
- [ ] `/src/components/layout/Header.tsx` - Use constants & new components
- [ ] `/src/components/layout/Footer.tsx` - Use constants & new components
- [ ] `/src/components/home/ActivitiesSection.tsx` - Use ActivityCard
- [ ] `/src/components/home/SubBrandsSection.tsx` - Use trackConfig
- [ ] `/src/components/home/TestimonialsSection.tsx` - Use TestimonialCard
- [ ] `/src/components/contact/ContactForm.tsx` - Add validation & toasts
- [ ] `/src/components/contact/ContactInfo.tsx` - Use SocialLinks
- [ ] `/src/components/tracks/TrackHero.tsx` - Use trackConfig
- [ ] `/src/components/tracks/TrackFeatures.tsx` - Use trackConfig colors
- [ ] `/src/components/tracks/TrackActivities.tsx` - Use ActivityCard
- [ ] `/src/components/tracks/TrackTestimonials.tsx` - Use TestimonialCard

---

## Definition of Done

A component/fix is "done" when:
- [ ] Code is written
- [ ] Tests pass (unit + integration)
- [ ] Accessibility is verified
- [ ] TypeScript has no errors
- [ ] ESLint passes
- [ ] Code is documented (JSDoc)
- [ ] Duplications are removed
- [ ] No hardcoded strings (i18n compliant)
- [ ] Works in both RTL and LTR
- [ ] Works on mobile (responsive)

---

## Timeline

```
Week 1: Phase 1 (Foundation) - Types, Config, Extraction, Notifications
├─ Mon-Tue: Type system & configuration
├─ Wed: Code deduplication (ActivityCard, TestimonialCard)
├─ Thu: i18n cleanup & notification system
└─ Fri: Testing & refinement

Week 2: Phase 2 (UI Components) - New components & consistency
├─ Mon-Tue: Create missing components
├─ Wed: Update existing components to use new ones
├─ Thu: Styling consistency pass
└─ Fri: Testing & refinement

Week 3: Phase 3-4 (Accessibility & Polish)
├─ Mon-Tue: Accessibility improvements
├─ Wed: Form validation with React Hook Form
├─ Thu: Documentation & component organization
└─ Fri: Testing & refinement

Week 4+: Phase 5 (Advanced) - As bandwidth allows
```

---

## Priority Order

1. **Extract ActivityCard** (high impact, low effort)
2. **Extract TestimonialCard** (high impact, low effort)
3. **Create trackConfig.ts** (high impact, medium effort)
4. **Fix hardcoded i18n strings** (medium impact, low effort)
5. **Replace alert() with toasts** (high impact, medium effort)
6. **Create missing UI components** (medium impact, medium effort)
7. **Add form validation** (high impact, medium effort)
8. **Accessibility improvements** (medium impact, medium effort)

