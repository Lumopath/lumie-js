# Lumie JS - Business Metrics Dashboard

A modern business metrics dashboard built with Node.js/TypeScript backend and Next.js frontend, featuring GraphQL API and real-time updates via Server-Sent Events (SSE).

## Project Structure

```
lumie-js/
├── api-js/          # Node.js/TypeScript backend with GraphQL & SSE
└── web/             # Next.js frontend with React Query
```

## Technology Stack

### Backend (api-js)

- **Node.js** with TypeScript
- **Express** web framework
- **Apollo Server** for GraphQL
- **Prisma ORM** with SQLite database
- **CORS** enabled for cross-origin requests
- **SSE** for real-time streaming

### Frontend (web)

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **React Query** (@tanstack/react-query) for data fetching & caching
- **GraphQL Request** for GraphQL client
- **CSS Modules** for component styling
- **Lucide React** for icons

## Features

- 📊 **Business KPIs**: Track ARR, MRR, customer metrics, growth rates, and more
- 🔄 **Real-time Updates**: Server-Sent Events for live data streaming
- 🎨 **Modern UI**: Beautiful, responsive design with CSS Modules
- 🔒 **Type Safety**: Full TypeScript integration across the stack
- 📈 **GraphQL API**: Flexible, efficient data querying
- ⚡ **React Query**: Smart caching and automatic refetching

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository** (if not already done):

   ```bash
   cd /Users/yuta/Developer/lumie-js
   ```

2. **Install dependencies and setup databases**:

   ```bash
   npm run setup      # Installs deps and sets up both api-js and web
   ```

3. **Start both services** (recommended):

   ```bash
   ./start            # Runs both API and web together
   # OR
   npm run dev        # Same as above
   ```

   **Alternative: Start services separately** (in different terminals):

   ```bash
   # Terminal 1 - API
   cd api-js
   npm run dev        # Start on http://localhost:3001

   # Terminal 2 - Web
   cd web
   npm run dev        # Start on http://localhost:3000
   ```

4. **Access the Application**:
   - Frontend Dashboard: http://localhost:3000
   - GraphQL API: http://localhost:3001/graphql
   - SSE Stream: http://localhost:3001/stream
   - Health Check: http://localhost:3001/health

### Process Manager

The `./start` script supports multiple process managers (in order of preference):

- **overmind** (recommended): `brew install overmind`
- **foreman**: `gem install foreman`
- **hivemind**: Available via various package managers

If none are installed, it falls back to running processes in the background.

## API Endpoints

### GraphQL Queries

```graphql
# Get all enabled metrics for a company
query GetMetrics {
  metrics(companyName: "Lumopath") {
    id
    name
    value
    unit
    description
    category
    recordedAt
    formattedValue
  }
}

# Get a single metric
query GetMetric {
  metric(id: "1") {
    id
    name
    formattedValue
  }
}

# Get metrics by category
query GetMetricsByCategory {
  metricsByCategory(category: "revenue") {
    id
    name
    formattedValue
  }
}
```

## Metrics Categories

The dashboard tracks metrics across five categories:

- **Revenue**: ARR, MRR
- **Customers**: Active accounts, churn rate
- **Growth**: NRR, monthly growth rate
- **Financial**: CAC, LTV, gross margin
- **Engagement**: Daily active users

## Sample Data

The application comes pre-seeded with 10 realistic business metrics:

| Metric                          | Value      | Category   |
| ------------------------------- | ---------- | ---------- |
| Annual Recurring Revenue (ARR)  | $2,850,000 | Revenue    |
| Monthly Recurring Revenue (MRR) | $237,500   | Revenue    |
| Active Accounts                 | 1,847      | Customers  |
| Customer Acquisition Cost (CAC) | $485       | Financial  |
| Monthly Churn Rate              | 3.2%       | Customers  |
| Customer Lifetime Value (LTV)   | $4,250     | Financial  |
| Net Revenue Retention (NRR)     | 112.8%     | Growth     |
| Daily Active Users              | 12,450     | Engagement |
| Gross Margin                    | 78.5%      | Financial  |
| Monthly Growth Rate             | 8.3%       | Growth     |

## Development

### Backend Development

```bash
cd api-js
npm run dev          # Start with hot reload
npm run build        # Build for production
npm run prisma:seed  # Re-seed database
```

### Frontend Development

```bash
cd web
npm run dev          # Start with hot reload
npm run build        # Build for production
npm run lint         # Run linter
```

## Architecture Highlights

### Backend

- **GraphQL Schema**: Type-safe API with resolvers for metrics queries
- **Prisma ORM**: Database abstraction with type-safe queries
- **Business Logic**: Filters metrics by status (enabled/active) and returns latest versions
- **SSE Endpoint**: Real-time streaming with proper headers and error handling

### Frontend

- **React Query**: Intelligent caching with 5-minute stale time and 30-second refetch
- **CSS Modules**: Component-scoped styling with category-based color coding
- **Responsive Design**: Mobile-first approach with CSS Grid
- **Loading States**: Graceful handling of loading, error, and empty states

## Comparison with Rails Version

This JavaScript/TypeScript port maintains feature parity with the original Rails implementation while offering:

- ✅ Same GraphQL schema and queries
- ✅ Identical sample data and business metrics
- ✅ Server-Sent Events for real-time updates
- ✅ Similar filtering logic for enabled metrics
- ✅ Matching API endpoints and routes
- ✅ Equivalent styling and UI design

## Documentation

- [Backend Documentation](./api-js/README.md)
- [Frontend Documentation](./web/README.md)

## License

MIT
