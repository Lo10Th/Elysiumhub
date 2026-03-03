'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-bold text-muted-foreground/20">500</h1>
      <h2 className="text-2xl font-semibold mt-4">Something went wrong</h2>
      <p className="text-muted-foreground mt-2 mb-6">
        An error occurred while loading this page.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}