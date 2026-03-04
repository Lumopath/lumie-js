# Lumie Web (Next.js)

A modern business metrics dashboard built with Next.js 15, TypeScript, React Query, and CSS Modules.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **React Query** for data fetching and caching
- **GraphQL Request** for GraphQL client
- **CSS Modules** for component-scoped styling
- **Responsive Design** with mobile-first approach
- **Real-time Updates** with automatic refetching

## Prerequisites

- Node.js 18+
- npm or yarn
- Running Lumie API (see `../api-js/README.md`)

## Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5100`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Configuration

The app connects to the GraphQL API at `http://localhost:3001/graphql` by default. To change this, set the `NEXT_PUBLIC_API_URL` environment variable:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://your-api-url/graphql
```

## Project Structure

```
web/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard page
│   ├── page.module.css    # Page styles
│   ├── globals.css        # Global styles
│   └── providers.tsx      # React Query provider
├── components/            # React components
│   ├── MetricCard.tsx
│   ├── MetricCard.module.css
│   ├── MetricsGrid.tsx
│   └── MetricsGrid.module.css
├── lib/                   # Utilities
│   ├── graphql-client.ts  # GraphQL client config
│   └── queries.ts         # GraphQL queries
└── types/                 # TypeScript types
    └── metric.ts
```

## Data Fetching

The app uses React Query for data fetching with the following configuration:

- **Stale Time**: 5 minutes
- **Refetch Interval**: 30 seconds
- **Retry**: 3 attempts on failure
- **Refetch on Window Focus**: Enabled

## Styling

The app uses CSS Modules for component-scoped styling with:

- Clean, modern light theme
- Responsive grid layout
- Category-based color coding
- Smooth hover animations
- Mobile-first approach

## Metrics Categories

Metrics are grouped by category:

- **Revenue**: ARR, MRR
- **Customers**: Active accounts, churn rate
- **Growth**: NRR, growth rates
- **Financial**: CAC, LTV, margins
- **Engagement**: Daily active users
