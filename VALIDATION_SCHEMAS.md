# Validation Schemas & Utilities

## Zod Schemas for Form Validation

### Activity Filters Validation

**File: `/src/lib/activities/validation.ts`**
```typescript
import { z } from 'zod'

export const ActivityFilterSchema = z.object({
  track: z
    .enum(['ai', 'kids', 'pro', 'edu', 'camp'])
    .optional(),
  type: z
    .enum(['lecture', 'workshop', 'course', 'camp', 'event'])
    .optional(),
  difficulty: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .optional(),
  minPrice: z
    .number()
    .min(0)
    .optional(),
  maxPrice: z
    .number()
    .min(0)
    .optional(),
  search: z
    .string()
    .max(100)
    .optional(),
  sort: z
    .enum(['newest', 'popular', 'price-asc', 'price-desc'])
    .optional(),
  page: z
    .number()
    .min(1)
    .optional(),
  limit: z
    .number()
    .min(1)
    .max(100)
    .optional()
}).refine((data) => {
  // Ensure maxPrice > minPrice if both are specified
  if (data.minPrice !== undefined && data.maxPrice !== undefined) {
    return data.minPrice <= data.maxPrice
  }
  return true
}, {
  message: 'Min price must be less than max price',
  path: ['minPrice']
})

export const RegistrationFormSchema = z.object({
  participantName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100),
  participantEmail: z
    .string()
    .email('Invalid email address'),
  participantPhone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number'),
  participantAge: z
    .number()
    .min(1)
    .max(150)
    .optional(),
  parentName: z
    .string()
    .min(2)
    .max(100)
    .optional(),
  parentEmail: z
    .string()
    .email()
    .optional(),
  parentPhone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number')
    .optional(),
  selectedDate: z
    .string()
    .datetime('Invalid date format'),
  notes: z
    .string()
    .max(500)
    .optional(),
  paymentMethod: z
    .enum(['credit-card', 'bank-transfer', 'paypal']),
  termsAccepted: z
    .boolean()
    .refine(v => v === true, 'You must accept the terms and conditions')
}).refine((data) => {
  // If participant is under 18, parent info is required
  if (data.participantAge && data.participantAge < 18) {
    return !!(data.parentName && data.parentEmail && data.parentPhone)
  }
  return true
}, {
  message: 'Parent information required for participants under 18',
  path: ['parentName']
})

export type ActivityFilterType = z.infer<typeof ActivityFilterSchema>
export type RegistrationFormType = z.infer<typeof RegistrationFormSchema>
```

### Blog Filters Validation

**File: `/src/lib/blog/validation.ts`**
```typescript
import { z } from 'zod'

export const BlogFilterSchema = z.object({
  category: z
    .string()
    .max(100)
    .optional(),
  tags: z
    .array(z.string().max(100))
    .optional(),
  author: z
    .string()
    .uuid()
    .optional(),
  search: z
    .string()
    .max(100)
    .optional(),
  sort: z
    .enum(['newest', 'popular', 'trending', 'oldest'])
    .optional(),
  page: z
    .number()
    .min(1)
    .optional(),
  limit: z
    .number()
    .min(1)
    .max(100)
    .optional()
})

export const CommentFormSchema = z.object({
  author: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100),
  email: z
    .string()
    .email('Invalid email address'),
  content: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(1000, 'Comment must not exceed 1000 characters'),
  rating: z
    .number()
    .min(1)
    .max(5)
    .optional(),
  replyToId: z
    .string()
    .uuid()
    .optional()
})

export type BlogFilterType = z.infer<typeof BlogFilterSchema>
export type CommentFormType = z.infer<typeof CommentFormSchema>
```

---

## Form Hook Usage

### Activity Registration Form Hook

**File: `/src/lib/hooks/useActivityRegistration.ts`**
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegistrationFormSchema, RegistrationFormType } from '@/lib/activities/validation'

export function useActivityRegistration(activityId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<RegistrationFormType>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      participantName: '',
      participantEmail: '',
      participantPhone: '',
      notes: '',
      paymentMethod: 'credit-card',
      termsAccepted: false
    }
  })

  const onSubmit = async (data: RegistrationFormType) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          activityId,
          ...data
        })
      })

      if (!response.ok) {
        throw new Error('Failed to register')
      }

      const result = await response.json()
      setSuccess(true)
      form.reset()
      
      // Optional: redirect to payment
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    error,
    success
  }
}
```

### Blog Filters Hook

**File: `/src/lib/hooks/useBlogFilters.ts`**
```typescript
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { BlogFilterSchema, BlogFilterType } from '@/lib/blog/validation'

export function useBlogFilters(locale: string) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filters = useMemo(() => {
    try {
      const params = Object.fromEntries(searchParams)
      return BlogFilterSchema.parse(params)
    } catch {
      return {}
    }
  }, [searchParams])

  const updateFilters = useCallback(
    (newFilters: Partial<BlogFilterType>) => {
      const merged = { ...filters, ...newFilters, page: 1 } // Reset to page 1 on filter change
      const params = new URLSearchParams()

      Object.entries(merged).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v))
          } else {
            params.append(key, String(value))
          }
        }
      })

      router.push(`?${params.toString()}`)
    },
    [filters, router]
  )

  const clearFilters = useCallback(() => {
    router.push('?')
  }, [router])

  return { filters, updateFilters, clearFilters }
}
```

---

## API Response Types

**File: `/src/types/api.ts`**
```typescript
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageCount: number
  aggregations?: Record<string, Array<{ value: string; count: number }>>
}

export interface RegistrationResponse {
  success: boolean
  registrationId: string
  paymentUrl?: string
  message: string
}

export interface ErrorResponse {
  error: string
  code: string
  details?: Record<string, string[]>
}
```

---

## Error Handling Utilities

**File: `/src/lib/utils/error.ts`**
```typescript
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, string[]>) {
    super('VALIDATION_ERROR', message, 400, details)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404)
    this.name = 'NotFoundError'
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      details: error.details
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'INTERNAL_ERROR',
      statusCode: 500
    }
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    statusCode: 500
  }
}
```

---

## Data Transformation Utilities

**File: `/src/lib/activities/transformers.ts`**
```typescript
import { Activity } from '@/types/activities'

export function calculateActivityPrice(activity: Activity) {
  if (!activity.base_price) return null

  const basePrice = activity.base_price
  const discount = activity.has_discount && activity.discount_percentage
    ? (basePrice * activity.discount_percentage) / 100
    : 0

  return {
    basePrice,
    discount,
    finalPrice: basePrice - discount,
    discountPercentage: activity.discount_percentage
  }
}

export function formatActivityPrice(activity: Activity): string {
  const price = calculateActivityPrice(activity)
  if (!price) return 'Free'

  if (price.discount > 0) {
    return `₪${price.finalPrice.toFixed(2)} (was ₪${price.basePrice.toFixed(2)})`
  }

  return `₪${price.basePrice.toFixed(2)}`
}

export function getActivityAvailabilityStatus(activity: Activity) {
  if (!activity.is_available) return 'unavailable'
  
  if (activity.max_participants && activity.current_participants >= activity.max_participants) {
    return 'full'
  }

  return 'available'
}

export function calculateAvailableSeats(activity: Activity): number {
  if (!activity.max_participants) return Infinity
  return Math.max(0, activity.max_participants - activity.current_participants)
}

export function canParticipantRegister(
  activity: Activity,
  participantAge?: number
): { canRegister: boolean; reason?: string } {
  // Check availability
  if (!activity.is_available) {
    return { canRegister: false, reason: 'Activity is not available' }
  }

  // Check capacity
  const availableSeats = calculateAvailableSeats(activity)
  if (availableSeats === 0) {
    return { canRegister: false, reason: 'Activity is full' }
  }

  // Check age requirements
  if (participantAge) {
    if (activity.min_age && participantAge < activity.min_age) {
      return {
        canRegister: false,
        reason: `Minimum age required: ${activity.min_age}`
      }
    }

    if (activity.max_age && participantAge > activity.max_age) {
      return {
        canRegister: false,
        reason: `Maximum age: ${activity.max_age}`
      }
    }
  }

  return { canRegister: true }
}
```

**File: `/src/lib/blog/transformers.ts`**
```typescript
import { BlogPost } from '@/types/blog'

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function excerptFromContent(content: string, length: number = 150): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/^#+\s/gm, '') // Remove headings
    .replace(/[*_~`]/g, '') // Remove emphasis
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .trim()

  if (plainText.length <= length) {
    return plainText
  }

  return plainText.substring(0, length).split(' ').slice(0, -1).join(' ') + '...'
}

export function generatePostSlug(title: string, locale: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .substring(0, 100) // Limit length
}

export function extractHeadings(content: string): Array<{ level: number; text: string; id: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Array<{ level: number; text: string; id: string }> = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2]
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ level, text, id })
  }

  return headings
}
```

---

## Date Utilities

**File: `/src/lib/utils/dates.ts`**
```typescript
import { format, formatDistanceToNow, isAfter, isBefore } from 'date-fns'
import { he } from 'date-fns/locale'

export function formatDate(date: string | Date, locale: string = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const dateLocale = locale === 'he' ? he : undefined
  return format(d, 'PPP', { locale: dateLocale })
}

export function formatDateTime(date: string | Date, locale: string = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const dateLocale = locale === 'he' ? he : undefined
  return format(d, 'PPp', { locale: dateLocale })
}

export function formatRelativeTime(date: string | Date, locale: string = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const dateLocale = locale === 'he' ? he : undefined
  return formatDistanceToNow(d, { addSuffix: true, locale: dateLocale })
}

export function isUpcoming(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  return isAfter(d, new Date())
}

export function hasStarted(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  return isBefore(d, new Date())
}

export function getUpcomingDates(dates: Array<{ date: string; seats: number }>) {
  const now = new Date()
  return dates
    .filter(d => isAfter(new Date(d.date), now))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
```

---

## Number & Currency Utilities

**File: `/src/lib/utils/currency.ts`**
```typescript
export function formatCurrency(
  amount: number,
  currency: string = 'ILS',
  locale: string = 'he-IL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export function calculateDiscount(price: number, discountPercent: number): number {
  return price - (price * discountPercent) / 100
}

export function calculateDiscountedPrice(
  basePrice: number,
  discountPercent: number
): { originalPrice: number; discount: number; finalPrice: number } {
  const discount = (basePrice * discountPercent) / 100
  return {
    originalPrice: basePrice,
    discount,
    finalPrice: basePrice - discount
  }
}

export function getPercentageOfTotal(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}
```

---

## Implementation Example: Registration API Route

**File: `/src/app/api/registrations/route.ts`**
```typescript
import { createServerSupabaseClient } from '@/lib/supabase'
import { RegistrationFormSchema } from '@/lib/activities/validation'
import { canParticipantRegister } from '@/lib/activities/transformers'
import { ValidationError, NotFoundError, handleError } from '@/lib/utils/error'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const data = RegistrationFormSchema.parse(body)
    const supabase = await createServerSupabaseClient()

    // Fetch activity
    const { data: activity, error: activityError } = await supabase
      .from('activities')
      .select('*')
      .eq('id', body.activityId)
      .single()

    if (activityError || !activity) {
      throw new NotFoundError('Activity')
    }

    // Check if participant can register
    const { canRegister, reason } = canParticipantRegister(
      activity,
      data.participantAge
    )

    if (!canRegister) {
      throw new ValidationError(reason || 'Cannot register for this activity')
    }

    // Create registration
    const { data: registration, error: registrationError } = await supabase
      .from('activity_registrations')
      .insert([
        {
          activity_id: body.activityId,
          participant_name: data.participantName,
          participant_email: data.participantEmail,
          participant_phone: data.participantPhone,
          participant_age: data.participantAge,
          parent_name: data.parentName,
          parent_email: data.parentEmail,
          parent_phone: data.parentPhone,
          selected_date: data.selectedDate,
          notes: data.notes,
          payment_method: data.paymentMethod,
          payment_status: 'pending',
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (registrationError) {
      throw new Error('Failed to create registration')
    }

    // TODO: Process payment based on paymentMethod

    return NextResponse.json({
      success: true,
      registrationId: registration.id,
      message: 'Registration successful. Please proceed to payment.'
    })
  } catch (error) {
    const errorInfo = handleError(error)
    return NextResponse.json(errorInfo, { status: errorInfo.statusCode })
  }
}
```

