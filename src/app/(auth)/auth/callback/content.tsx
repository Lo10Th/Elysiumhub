'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()
      
      const { error } = await supabase.auth.getSession()
      
      if (error) {
        router.push('/login?error=auth_callback_error')
        return
      }
      
      router.push(redirect)
      router.refresh()
    }

    handleCallback()
  }, [router, redirect])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  )
}