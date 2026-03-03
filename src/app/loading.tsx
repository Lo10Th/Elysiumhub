import { Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-muted-foreground mt-4">Loading...</p>
    </div>
  )
}