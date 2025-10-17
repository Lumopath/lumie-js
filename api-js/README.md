# Lumie API (Node.js/TypeScript)

A GraphQL-powered business metrics API built with Node.js, TypeScript, Express, Apollo Server, and Prisma.

## Features

- **GraphQL API** with Apollo Server
- **Prisma ORM** with SQLite database
- **Server-Sent Events (SSE)** for real-time updates
- **TypeScript** for type safety
- **CORS** enabled for cross-origin requests

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up the database**:

   ```bash
   npm run setup
   ```

   This will:

   - Generate Prisma client
   - Run database migrations
   - Seed sample data

3. **Start the development server**:
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data
- `npm run setup` - Complete setup (generate + migrate + seed)

## API Endpoints

### GraphQL API

- **Endpoint**: `POST http://localhost:3001/graphql`
- **Playground**: Visit `http://localhost:3001/graphql` in your browser

### SSE Stream

- **Endpoint**: `GET http://localhost:3001/stream`
- Sends real-time metrics updates every 5 seconds

### Health Check

- **Endpoint**: `GET http://localhost:3001/health`

## GraphQL Queries

### Get All Metrics

```graphql
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
```

### Get Single Metric

```graphql
query GetMetric {
  metric(id: "1") {
    id
    name
    formattedValue
  }
}
```

### Get Metrics by Category

```graphql
query GetMetricsByCategory {
  metricsByCategory(category: "revenue") {
    id
    name
    formattedValue
  }
}
```

## Sample Metrics

The database is pre-seeded with 10 business metrics:

- Annual Recurring Revenue (ARR): $2,850,000
- Monthly Recurring Revenue (MRR): $237,500
- Active Accounts: 1,847
- Customer Acquisition Cost (CAC): $485
- Monthly Churn Rate: 3.2%
- Customer Lifetime Value (LTV): $4,250
- Net Revenue Retention (NRR): 112.8%
- Daily Active Users: 12,450
- Gross Margin: 78.5%
- Monthly Growth Rate: 8.3%
