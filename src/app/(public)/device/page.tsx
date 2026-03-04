'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Terminal, CheckCircle, XCircle, Loader2, Shield, Monitor } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ely.karlharrenga.com'

function DeviceContent() {
  const searchParams = useSearchParams()
  const codeFromUrl = searchParams.get('code')
  
  const [userCode, setUserCode] = useState(codeFromUrl || '')
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [deviceInfo, setDeviceInfo] = useState<{ client_name: string } | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  useEffect(() => {
    if (userCode && userCode.length === 9 && userCode.includes('-')) {
      checkDeviceStatus()
    }
  }, [userCode])

  const checkDeviceStatus = async () => {
    if (!userCode) return
    
    try {
      const response = await fetch(`${API_URL}/api/auth/device/status?user_code=${encodeURIComponent(userCode)}`)
      if (response.ok) {
        const data = await response.json()
        setDeviceInfo({ client_name: data.client_name })
      }
    } catch (e) {
      // Ignore errors for status check
    }
  }

  const handleVerify = async () => {
    if (!user) {
      setError('Please log in to authorize this device')
      return
    }

    if (!userCode || userCode.length !== 9) {
      setError('Please enter a valid code (format: XXXX-XXXX)')
      return
    }

    setVerifying(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setError('Session expired. Please log in again.')
        setVerifying(false)
        return
      }

      const response = await fetch(`${API_URL}/api/auth/device/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ user_code: userCode }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to verify device')
      }

      setStatus('success')
    } catch (err: any) {
      setError(err.message || 'Failed to verify device')
      setStatus('error')
    } finally {
      setVerifying(false)
    }
  }

  const handleCancel = () => {
    setUserCode('')
    setStatus('idle')
    setError(null)
    setDeviceInfo(null)
  }

  // Format user code as user types
  const handleCodeChange = (value: string) => {
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (cleaned.length <= 8) {
      if (cleaned.length > 4) {
        setUserCode(`${cleaned.slice(0, 4)}-${cleaned.slice(4)}`)
      } else {
        setUserCode(cleaned)
      }
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Device Authorized</CardTitle>
            <CardDescription>
              You can now close this page and return to your terminal.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">Login Required</CardTitle>
            <CardDescription>
              You need to be logged in to authorize a device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href={`/login?redirect=${encodeURIComponent('/device' + (codeFromUrl ? `?code=${codeFromUrl}` : ''))}`}>
                Sign In
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Terminal className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Authorize CLI</CardTitle>
          <CardDescription>
            Enter the code displayed in your terminal to authorize the Elysium CLI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
              <XCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="code">Device Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="XXXX-XXXX"
              value={userCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="text-center text-2xl tracking-widest font-mono"
              maxLength={9}
              autoFocus
            />
          </div>

          {deviceInfo && (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Monitor className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{deviceInfo.client_name}</p>
                <p className="text-muted-foreground">is requesting access to your account</p>
              </div>
            </div>
          )}

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">This will allow the CLI to:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                Access your profile information
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                Publish and manage your emblems
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                Use your API keys
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleVerify}
            disabled={verifying || userCode.length !== 9}
          >
            {verifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Authorize
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function DevicePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <DeviceContent />
    </Suspense>
  )
}