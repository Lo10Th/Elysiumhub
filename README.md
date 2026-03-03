# Elysium Hub

The web interface for the Elysium API App Store.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Add your Supabase credentials to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS + shadcn/ui
- **Auth**: Supabase Auth (email/password + OAuth)
- **Database**: Supabase PostgreSQL
- **Search**: PostgreSQL Full-Text Search

## Features

- Browse and search emblems
- User authentication (email/password + GitHub OAuth)
- Dashboard for managing your emblems
- Publish new emblems
- User profiles

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL`