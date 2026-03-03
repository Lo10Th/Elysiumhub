'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/supabase/client'
import { Loader2, User, Key, Check } from 'lucide-react'

export default function SettingsPage() {
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (profile) {
          setUsername(profile.username || '')
          setBio(profile.bio || '')
        }
      }
    }
    
    loadProfile()
  }, [])

  const handleSaveProfile = async () => {
    setLoading(true)
    setSaved(false)

    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ username, bio })
      .eq('id', user.id)

    if (!error) {
      setSaved(true)
    }
    setLoading(false)
  }

  return (
    <div className="container py-8 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>
              Manage your public profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="A short bio about yourself"
                maxLength={200}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={handleSaveProfile} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
              {saved && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Saved
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* API Tokens */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Tokens
            </CardTitle>
            <CardDescription>
              Manage tokens for CLI authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate API tokens to use with the Elysium CLI for publishing emblems.
            </p>
            <Button variant="outline">
              Manage Tokens
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}