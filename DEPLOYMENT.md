# Elysium Hub - Deployment & Setup Guide

## Overview

This document covers the complete setup and deployment of the Elysium Hub web application.

---

## 1. Supabase Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key from Project Settings > API

### Run Database Migration

1. Go to SQL Editor in Supabase dashboard
2. Copy the contents of `server/migrations/001_profiles_and_search.sql`
3. Execute the SQL

This will create:
- `profiles` table with RLS policies
- Full-text search index on `emblems` table
- `search_emblems_fts` RPC function
- Auto-create profile trigger on signup
- Storage bucket for avatars

### Configure OAuth Providers (Optional)

**GitHub OAuth:**
1. Go to GitHub > Settings > Developer settings > OAuth Apps > New OAuth App
2. Set Authorization callback URL: `https://<your-project>.supabase.co/auth/v1/callback`
3. Copy Client ID and Client Secret
4. In Supabase, go to Authentication > Providers > GitHub and enable it
5. Paste the credentials

**Google OAuth:**
1. Go to Google Cloud Console > APIs & Services > Credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`
4. In Supabase, go to Authentication > Providers > Google and enable it

---

## 2. Web UI Deployment (Vercel)

### Clone & Install

```bash
git clone https://github.com/Lo10Th/Elysiumhub
cd Elysiumhub
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://ely.karlharrenga.com
```

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Configure Custom Domain

1. In Vercel dashboard, go to Settings > Domains
2. Add `hub.ely.karlharrenga.com`
3. Configure DNS records as instructed

---

## 3. Server Configuration

Add to your server `.env`:

```env
FRONTEND_URL=https://hub.ely.karlharrenga.com
```

This is used for password reset emails and OAuth redirects.

---

## 4. Update CORS

Update `server/app/config.py` or `.env` to allow the web UI domain:

```env
CORS_ORIGINS=["https://hub.ely.karlharrenga.com", "http://localhost:3000"]
```

---

## File Structure

```
elysiumhub/
├── src/
│   ├── app/
│   │   ├── (auth)/           # Auth pages (login, register, etc.)
│   │   ├── (protected)/      # Protected pages (dashboard, settings)
│   │   ├── (public)/         # Public pages (emblems, search, profiles)
│   │   ├── layout.tsx        # Root layout with header/footer
│   │   ├── page.tsx          # Homepage
│   │   ├── error.tsx         # Error boundary
│   │   ├── loading.tsx       # Loading state
│   │   └── not-found.tsx     # 404 page
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── header.tsx        # Site header with auth
│   │   ├── footer.tsx        # Site footer
│   │   └── emblem-card.tsx   # Emblem card component
│   ├── lib/
│   │   ├── api.ts            # API client
│   │   ├── supabase/         # Supabase SSR clients
│   │   └── utils.ts          # Utilities
│   ├── types/                # TypeScript types
│   └── middleware.ts         # Auth middleware
├── .env.example              # Environment template
└── README.md
```

---

## Features Implemented

### Auth
- [x] Email/password registration
- [x] Email/password login
- [x] GitHub OAuth
- [x] Password reset flow
- [x] Profile management
- [x] Protected routes

### Pages
- [x] Homepage with hero
- [x] Emblems browser with categories
- [x] Search with full-text search
- [x] Emblem detail page
- [x] User profiles
- [x] Dashboard
- [x] Publish emblem
- [x] My emblems
- [x] Settings

### Components
- [x] Header with user menu
- [x] Footer
- [x] Emblem cards
- [x] Search bar
- [x] Auth forms
- [x] Loading states
- [x] Error pages

---

## Remaining Tasks

1. **Testing**: Test all auth flows end-to-end
2. **Email Templates**: Customize Supabase email templates
3. **Rate Limiting**: Adjust limits for production
4. **Monitoring**: Add error tracking (e.g., Sentry)
5. **Analytics**: Optional analytics integration

---

## Troubleshooting

### OAuth not working
- Verify callback URLs match exactly
- Check that OAuth provider is enabled in Supabase
- Ensure cookies are enabled

### Profile not created on signup
- Run the migration SQL again
- Check Supabase logs for trigger errors

### Search not working
- Ensure `search_vector` column exists
- Run `UPDATE emblems SET search_vector = ...` to populate existing data
- Check RPC function exists