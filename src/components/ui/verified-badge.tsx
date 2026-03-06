import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerifiedBadgeProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function VerifiedBadge({ className, size = 'md' }: VerifiedBadgeProps) {
  const sizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  return (
    <CheckCircle2
      className={cn(
        'text-blue-500 fill-blue-500/20 inline-block',
        sizes[size],
        className
      )}
      aria-label="Verified"
    />
  )
}