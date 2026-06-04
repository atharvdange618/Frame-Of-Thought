# Frame of Thought

A philosophical cinema archive built with Next.js 16 (App Router). Film lovers and developers link movies to philosophical concepts, submit analyses, vote on ideas, and build curated pathways - ordered journeys through films that explore a single idea from different angles.

---

## Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Framework   | Next.js 16.1.7 (App Router, TypeScript) |
| Database    | PostgreSQL + Prisma 7 ORM               |
| Styling     | Tailwind CSS v4                         |
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable       |
| Validation  | Zod                                     |
| State       | Zustand + TanStack Query                |
| Theming     | next-themes (dark / light toggle)       |
| Package Mgr | pnpm (strict - no npm or yarn)          |
| Movie Data  | TMDB API                                |

---

## Features

- **Browse films** - poster grid with TMDB-sourced data
- **Movie detail** - description, director, year, and all community analyses
- **Submit analysis** - link a film to one or more philosophy concepts with your own written take
- **Vote** - upvote/downvote analyses; one vote per named voter
- **Pathways** - curated, drag-and-drop ordered sequences of films with notes
- **Philosophy concepts** - 15 pre-seeded concepts each with their analyses
- **Dark / light mode** - toggle in navbar, defaults to dark
- **Loading skeletons** - every page has a `loading.tsx` skeleton
- **Error boundaries** - per-segment `error.tsx` with reset + navigation
- **Custom 404** - thematic not-found page

---

## Rendering Strategies

| Page               | Strategy | Revalidation | Rationale                                    |
| ------------------ | -------- | ------------ | -------------------------------------------- |
| `/`                | ISR      | 60s          | Trending content changes regularly           |
| `/movies`          | ISR      | 300s         | Movie catalog changes slowly                 |
| `/movies/[id]`     | SSR      | -            | Vote counts and analyses change in real time |
| `/concepts`        | SSG      | -            | Fixed seed set, never changes                |
| `/concepts/[slug]` | ISR      | 120s         | New analyses trickle in                      |
| `/pathways`        | ISR      | 120s         | Community-created, moderate change rate      |
| `/pathways/[id]`   | SSR      | -            | Low volume, keeps it simple                  |
| `/pathways/new`    | SSR      | -            | Form needs fresh movie list from DB          |
| `/submit`          | SSR      | -            | Form needs fresh data                        |
| `/about`           | SSG      | -            | Static content, never changes                |

---

## API Routes

All responses follow: `{ success: boolean, data?: T, error?: string, message?: string }`

| Method | Endpoint             | Description                                    |
| ------ | -------------------- | ---------------------------------------------- |
| GET    | `/api/movies`        | List movies, supports `?search=` for typeahead |
| POST   | `/api/movies`        | Create a movie                                 |
| GET    | `/api/movies/[id]`   | Single movie with analyses                     |
| GET    | `/api/analyses`      | List analyses (`?movieId=`, `?conceptId=`)     |
| POST   | `/api/analyses`      | Create analysis (programmatic)                 |
| GET    | `/api/analyses/[id]` | Single analysis with concepts                  |
| PUT    | `/api/analyses/[id]` | Update analysis                                |
| DELETE | `/api/analyses/[id]` | Delete analysis (cascades votes + joins)       |
| GET    | `/api/concepts`      | List all philosophy concepts                   |
| GET    | `/api/pathways`      | List pathways                                  |
| POST   | `/api/pathways`      | Create pathway                                 |
| GET    | `/api/pathways/[id]` | Pathway with ordered items + movie details     |
| PUT    | `/api/pathways/[id]` | Update pathway                                 |
| DELETE | `/api/pathways/[id]` | Delete pathway                                 |

---

## Server Actions

| Action           | File                            | Description                                              |
| ---------------- | ------------------------------- | -------------------------------------------------------- |
| `submitAnalysis` | `app/actions/submitAnalysis.ts` | Creates Analysis + AnalysisConcept rows in a transaction |
| `castVote`       | `app/actions/castVote.ts`       | Upserts Vote, recalculates upvotes on Analysis           |
| `createPathway`  | `app/actions/createPathway.ts`  | Creates Pathway + PathwayItems in a transaction          |

**Server Actions vs API Routes:** Actions handle form submissions within the Next.js UI flow (redirect, revalidate path). API Routes return JSON for any consumer and are tested independently via HTTP.

---

## Database Schema

6 tables in PostgreSQL via Prisma:

```
Movie             - id, tmdbId, title, year, director, posterUrl, description
PhilosophyConcept - id, name, slug, description
Analysis          - id, movieId, authorName, title, body, upvotes
AnalysisConcept   - id, analysisId, conceptId, relevance  (join table)
Vote              - id, analysisId, voterName, value (+1 / -1)
Pathway           - id, title, description, authorName
PathwayItem       - id, pathwayId, movieId, sortOrder, note
```

Unique constraints prevent duplicate votes per `[analysisId, voterName]` and duplicate concept tags per `[analysisId, conceptId]`. All foreign keys cascade on delete.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/frame-of-thought"
TMDB_API_KEY="your_tmdb_api_key_here"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Get a free TMDB API key at [themoviedb.org](https://www.themoviedb.org/settings/api).

---

## Running Locally

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and TMDB_API_KEY

# Push schema to database
pnpm prisma db push

# Seed with TMDB movie data and philosophy concepts
pnpm seed

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Setup

Requires a PostgreSQL instance. With a local Postgres running:

```sql
CREATE DATABASE "frame-of-thought";
```

Then set `DATABASE_URL` accordingly. The Prisma adapter uses `@prisma/adapter-pg` with a connection pool.

---

## Project Structure

```
app/
├── layout.tsx                    # Root layout - navbar, footer, theme provider
├── page.tsx                      # / Home - ISR 60s
├── loading.tsx                   # Root loading skeleton
├── error.tsx                     # Root error boundary
├── not-found.tsx                 # Custom 404
├── about/page.tsx                # /about - SSG
├── movies/
│   ├── loading.tsx
│   ├── page.tsx                  # /movies - ISR 300s
│   └── [id]/
│       ├── loading.tsx
│       ├── error.tsx
│       └── page.tsx              # /movies/[id] - SSR
├── concepts/
│   ├── loading.tsx
│   ├── page.tsx                  # /concepts - SSG
│   └── [slug]/
│       ├── loading.tsx
│       ├── error.tsx
│       └── page.tsx              # /concepts/[slug] - ISR 120s
├── pathways/
│   ├── loading.tsx
│   ├── page.tsx                  # /pathways - ISR 120s
│   ├── new/
│   │   ├── loading.tsx
│   │   └── page.tsx              # /pathways/new - SSR
│   └── [id]/
│       ├── loading.tsx
│       ├── error.tsx
│       └── page.tsx              # /pathways/[id] - SSR
├── submit/
│   ├── loading.tsx
│   └── page.tsx                  # /submit - SSR
└── api/
    ├── movies/route.ts + [id]/route.ts
    ├── analyses/route.ts + [id]/route.ts
    ├── concepts/route.ts
    └── pathways/route.ts + [id]/route.ts

components/
├── AnalysisCard.tsx
├── AnalysisForm.tsx              # use client
├── AnalysisList.tsx
├── PathwayBuilder.tsx            # use client - dnd-kit
├── PathwayCard.tsx
├── PathwayForm.tsx               # use client
├── PathwayTimeline.tsx
├── ThemeProvider.tsx             # use client - wraps next-themes
├── ThemeToggle.tsx               # use client - moon/sun icon button
└── VoteButtons.tsx               # use client

lib/
├── api-response.ts               # Typed JSON response helpers
├── prisma.ts                     # Prisma client singleton
└── tmdb.ts                       # TMDB API service layer

prisma/
├── schema.prisma
└── seed.ts                       # Fetches TMDB data, seeds all tables
```

---

## Concepts Covered

- **File-based routing** - all 14 pages in `app/` directory using folder conventions
- **Layouts** - root layout wraps all pages with sticky navbar and footer
- **SSR** - `/movies/[id]`, `/pathways/[id]`, `/submit`, `/pathways/new`
- **SSG** - `/concepts`, `/about` with `generateStaticParams` / `force-static`
- **ISR** - `/`, `/movies`, `/concepts/[slug]`, `/pathways` with `revalidate`
- **API Routes** - 14 endpoints covering GET, POST, PUT, DELETE
- **Server Actions** - 3 actions with `"use server"`, Zod validation, `revalidatePath`
- **Database** - PostgreSQL + Prisma, 6 tables, full CRUD, seeded data
- **Error handling** - try/catch in all routes, Zod validation in actions, error boundaries
- **Loading states** - `loading.tsx` for every segment
- **Dark mode** - `next-themes` ThemeProvider with client toggle

---

## Assumptions and Limitations

- Authentication is not implemented; author/voter names are entered manually.
- The seed script fetches live TMDB data - a valid `TMDB_API_KEY` is required to seed.
- Dark mode toggle defaults to dark; no system preference detection.
- No pagination on movie/analysis listings (seed data is small enough).
