# Code Duplication - Quick Reference Guide

## Critical Duplications to Fix

### 1. Activity Card - 90% DUPLICATION

#### Location A: ActivitiesSection.tsx (lines 63-157)
```tsx
<motion.div
  key={activity.id}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  className="group"
>
  <Link href={`/${locale}/activities/${activity.slug}`}>
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={activity.image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Track Badge */}
        <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} px-3 py-1 rounded-full ${trackColors[activity.track]} text-white text-sm font-medium`}>
          {t(`home.tracks.${activity.track}.title`)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4" />
            <span>{activity.participants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(activity.startDate).toLocaleDateString(locale)}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
</motion.div>
```

#### Location B: TrackActivities.tsx (lines 109-150)
```tsx
<motion.div
  key={activity.id}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
  <Link href={`/${locale}/activities/${activity.slug}`}>
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-48">
        <Image
          src={activity.image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4" />
            <span>{activity.participants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(activity.startDate).toLocaleDateString(locale)}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
</motion.div>
```

**Differences:**
- ActivitiesSection has track badge, description text (extra features)
- TrackActivities is simpler (just card without badge)
- Both share: Motion animation, Link wrapper, Grid styling, Meta info layout

**Solution:**
```tsx
// src/components/ui/ActivityCard.tsx
interface ActivityCardProps {
  activity: Activity;
  title: string;
  showBadge?: boolean;
  showDescription?: boolean;
  description?: string;
  trackColor?: string;
}

export function ActivityCard({
  activity,
  title,
  showBadge = false,
  showDescription = false,
  description = "",
  trackColor = ""
}: ActivityCardProps) {
  return (
    // Shared card implementation with conditional rendering
  );
}
```

**LOC Savings:** ~80 lines

---

### 2. Testimonial Card - 95% DUPLICATION

#### Location A: TestimonialsSection.tsx (lines 71-112)
```tsx
<motion.div
  key={testimonial.id}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
    {/* Quote Icon */}
    <div className="mb-4">
      <Quote className="w-10 h-10 text-blue-500 opacity-50" />
    </div>

    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>

    {/* Content */}
    <p className="text-gray-700 mb-6 flex-1 leading-relaxed">
      {content}
    </p>

    {/* Author */}
    <div className="flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonial.image})` }}
      />
      <div>
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  </div>
</motion.div>
```

#### Location B: TrackTestimonials.tsx (lines 99-133)
```tsx
<motion.div
  key={testimonial.id}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
    <div className="mb-4">
      <Quote className="w-10 h-10 text-blue-500 opacity-50" />
    </div>
    <div className="flex gap-1 mb-4">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
    <p className="text-gray-700 mb-6 flex-1 leading-relaxed">
      {content}
    </p>
    <div className="flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonial.image})` }}
      />
      <div>
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  </div>
</motion.div>
```

**Differences:** Literally identical except whitespace

**Solution:**
```tsx
// src/components/ui/TestimonialCard.tsx
interface TestimonialCardProps {
  testimonial: Testimonial;
  name: string;
  role: string;
  content: string;
}

export function TestimonialCard({ 
  testimonial, 
  name, 
  role, 
  content 
}: TestimonialCardProps) {
  return (
    // Shared testimonial card implementation
  );
}
```

**LOC Savings:** ~70 lines

---

### 3. Track Colors Configuration - SCATTERED EVERYWHERE

#### Location A: Header.tsx (lines 11-42)
```tsx
const subBrands = [
  {
    id: "ai",
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-600",
    bgHover: "hover:bg-purple-50",
  },
  {
    id: "kids",
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-600",
    bgHover: "hover:bg-blue-50",
  },
  // ... etc
];
```

#### Location B: ActivitiesSection.tsx (lines 45-51)
```tsx
const trackColors: Record<string, string> = {
  ai: "bg-gradient-to-r from-purple-500 to-pink-500",
  kids: "bg-gradient-to-r from-blue-500 to-cyan-500",
  pro: "bg-gradient-to-r from-orange-500 to-red-500",
  edu: "bg-gradient-to-r from-green-500 to-emerald-500",
  camp: "bg-gradient-to-r from-yellow-500 to-amber-500",
};
```

#### Location C: SubBrandsSection.tsx (lines 9-40)
```tsx
const subBrands = [
  {
    id: "ai",
    icon: Cpu,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    hoverColor: "hover:from-purple-600 hover:to-pink-600",
  },
  // ... etc
];
```

#### Location D: TrackHero.tsx (lines 15-21)
```tsx
const trackGradients = {
  ai: "from-purple-600 via-pink-600 to-purple-800",
  kids: "from-blue-600 via-cyan-600 to-blue-800",
  pro: "from-orange-600 via-red-600 to-orange-800",
  edu: "from-green-600 via-emerald-600 to-green-800",
  camp: "from-yellow-600 via-amber-600 to-yellow-800",
};
```

**Problem:** Same data defined 4 different ways, inconsistent formats, no single source of truth

**Solution:**
```tsx
// src/constants/trackConfig.ts
import { Cpu, Users, Code, GraduationCap, Tent } from "lucide-react";

export const TRACK_CONFIG = {
  ai: {
    id: "ai",
    icon: Cpu,
    color: {
      light: "from-purple-500 to-pink-500",
      dark: "from-purple-600 via-pink-600 to-purple-800",
      hover: "hover:from-purple-600 hover:to-pink-600",
      bg: "bg-gradient-to-br from-purple-500 to-pink-500",
      bgHover: "hover:bg-purple-50",
      text: "text-purple-600",
    },
  },
  kids: {
    id: "kids",
    icon: Users,
    color: {
      light: "from-blue-500 to-cyan-500",
      dark: "from-blue-600 via-cyan-600 to-blue-800",
      hover: "hover:from-blue-600 hover:to-cyan-600",
      bg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      bgHover: "hover:bg-blue-50",
      text: "text-blue-600",
    },
  },
  // ... etc
} as const;

export type TrackId = keyof typeof TRACK_CONFIG;
```

**LOC Savings:** ~80 lines (remove duplicates), +40 lines (centralized config) = net -40 lines

---

### 4. Hardcoded Strings in Components

#### Location A: Footer.tsx (line 75)
```tsx
alert("נרשמת בהצלחה לניוזלטר!"); // Hardcoded Hebrew
```

#### Location B: Footer.tsx (lines 78, 81)
```tsx
alert(data.error || "משהו השתבש");
alert("משהו השתבש, אנא נסה שנית");
```

#### Location C: ContactInfo.tsx (line 117)
```tsx
<h3 className="font-bold text-lg mb-4">עקבו אחרינו</h3> // Hardcoded Hebrew
```

**Solution:** Move all strings to i18n files:
```tsx
// In your translation files (e.g., messages/en.json and messages/he.json)
{
  "footer": {
    "newsletter": {
      "success": "Successfully subscribed to newsletter!",
      "error": "Something went wrong",
      "errorRetry": "Something went wrong, please try again"
    }
  },
  "contact": {
    "info": {
      "followUs": "Follow us"
    }
  }
}
```

Then use:
```tsx
const t = useTranslations();
alert(t("footer.newsletter.success"));
```

---

## Summary of Duplications to Fix

| Duplication | Type | Files | LOC | Impact | Effort |
|------------|------|-------|-----|--------|--------|
| Activity Cards | Code | 2 | ~80 | High | Low |
| Testimonial Cards | Code | 2 | ~70 | High | Low |
| Track Colors | Config | 4 | ~80 | High | Med |
| Navigation Data | Config | 3 | ~60 | Med | Low |
| Mock Data | Data | 4 | ~100 | Med | Med |
| Hardcoded Strings | i18n | 3 | ~20 | Med | Low |
| Form Inputs Styling | Style | Multiple | ~30 | Low | Low |
| Icon Containers | Style | Multiple | ~40 | Low | Med |
| **TOTAL** | **Multiple** | **20+** | **~480** | **High** | **Med** |

**After Refactoring:** Remove ~300 lines, add ~150 lines of shared code = **Net -150 LOC**

