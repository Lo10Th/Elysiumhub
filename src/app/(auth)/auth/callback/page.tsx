import { Suspense } from 'react'
import AuthCallbackContent from './content'

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Completing sign in...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}