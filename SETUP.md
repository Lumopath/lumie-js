# Quick Setup Guide

This guide will help you get both the backend and frontend running in minutes.

## One-Command Setup (Recommended)

```bash
cd /Users/yuta/Developer/lumie-js

# Install all dependencies and setup database
npm run setup

# Make start script executable
chmod +x start

# Start both services together
./start
# OR
npm run dev
```

That's it! The `./start` script will run both the API and web frontend together.

**What you'll see:**

- API server starting at http://localhost:3001
- Web frontend starting at http://localhost:3000

Open your browser to **http://localhost:3000** to view the dashboard!

---

## Manual Setup (Alternative)

If you prefer to run services separately or the `./start` script doesn't work:

### Step 1: Backend Setup (api-js)

Open a terminal and run:

```bash
cd /Users/yuta/Developer/lumie-js/api-js

# Install dependencies
npm install

# Setup database and seed data (all-in-one)
npm run setup

# Start the development server
npm run dev
```

You should see:

```
🚀 Server ready at http://localhost:3001
📊 GraphQL endpoint: http://localhost:3001/graphql
📡 SSE stream: http://localhost:3001/stream
```

## Step 2: Frontend Setup (web)

Open a **new terminal** and run:

```bash
cd /Users/yuta/Developer/lumie-js/web

# Install dependencies
npm install

# Start the development server
npm run dev
```

You should see:

```
▲ Next.js 15.x.x
- Local: http://localhost:3000
```

## Step 3: View the Dashboard

Open your browser to:

- **Dashboard**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3001/graphql

## Troubleshooting

### Backend won't start?

1. Make sure SQLite is available (should be installed by default on macOS)
2. Delete `api-js/dev.db` and run `npm run setup` again
3. Check if port 3001 is already in use

### Frontend won't start?

1. Check if port 3000 is already in use
2. Make sure the backend is running first
3. Clear Next.js cache: `rm -rf .next`

### No data showing?

1. Verify the backend is running on port 3001
2. Check browser console for errors
3. Make sure you ran `npm run setup` in the api-js folder

## What You Get

The dashboard displays 10 business metrics across 5 categories:

### Revenue

- Annual Recurring Revenue (ARR): $2,850,000
- Monthly Recurring Revenue (MRR): $237,500

### Customers

- Active Accounts: 1,847
- Monthly Churn Rate: 3.2%

### Growth

- Net Revenue Retention (NRR): 112.8%
- Monthly Growth Rate: 8.3%

### Financial

- Customer Acquisition Cost (CAC): $485
- Customer Lifetime Value (LTV): $4,250
- Gross Margin: 78.5%

### Engagement

- Daily Active Users: 12,450

## Testing the GraphQL API

Visit http://localhost:3001/graphql and try this query:

```graphql
query GetMetrics {
  metrics(companyName: "Lumopath") {
    id
    name
    formattedValue
    category
    description
  }
}
```

## Process Manager (Optional)

The `./start` script supports multiple process managers for better development experience:

- **overmind** (recommended): `brew install overmind`
- **foreman**: `gem install foreman`
- **hivemind**: Available via various package managers

If none are installed, it falls back to running processes in the background with basic output.

## Next Steps

- Explore the GraphQL API at http://localhost:3001/graphql
- Try the SSE endpoint at http://localhost:3001/stream
- Check the READMEs in each folder for more details
- Customize the metrics in `api-js/src/seed.ts`
- Use `Ctrl+C` to stop all services when using `./start`
