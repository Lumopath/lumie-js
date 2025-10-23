# Pair Programming Exercise - Bug Reference

This document contains the list of intentional bugs introduced for the pair programming exercise. **DO NOT share with candidates.**

---

## Bug List (5 Total)

### Bug 1: Database Query Fetches All Records

**File:** `api-js/src/graphql/resolvers.ts` (lines 42-48)
**Severity:** High - Performance Issue

**Problem:**
The `metrics` resolver fetches ALL metrics from the database without a WHERE clause, then filters by company in JavaScript memory.

```typescript
const allMetrics = await prisma.metric.findMany({
  orderBy: { recordedAt: "desc" },
});
const companyMetrics = allMetrics.filter((m) => m.companyName === companyName);
```

**Impact:**

- Loads entire metrics table into memory
- Doesn't use database indexes on `companyName` field
- O(n) filtering instead of indexed database query
- Performance degrades linearly with table size
- Unnecessary network overhead transferring all records

**Fix:**
Add WHERE clause to filter at database level:

```typescript
const allMetrics = await prisma.metric.findMany({
  where: { companyName: companyName },
  orderBy: { recordedAt: "desc" },
});
```

**Discussion Points:**

- Database indexes and query optimization
- When to filter in database vs application layer
- Understanding query performance and EXPLAIN ANALYZE
- Memory usage implications

---

### Bug 2: CSS Hover Selector Too Specific

**File:** `web/components/MetricCard.module.css` (line 10)
**Severity:** Low - Visual Issue

**Problem:**
The hover selector is `.card .card:hover` which requires a `.card` element inside another `.card` element. This never matches since cards don't nest.

```css
.card .card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
```

**Impact:**

- Hover effect doesn't work
- No visual feedback when mousing over metric cards
- Poor user experience

**Fix:**
Change selector to just `.card:hover`:

```css
.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
```

**Discussion Points:**

- CSS specificity rules
- CSS Modules scoping
- Testing visual/interactive states
- Browser DevTools for debugging CSS

---

### Bug 3: React Query Refetches Too Aggressively

**File:** `web/components/MetricsGrid.tsx` (lines 16-17)
**Severity:** High - Performance Issue

**Problem:**
React Query is configured to refetch every second with no stale time, causing excessive API requests.

```typescript
staleTime: 0,
refetchInterval: 1000,
```

**Impact:**

- API called every second regardless of data changes
- Unnecessary server load
- Excessive network requests
- Battery drain on mobile devices
- Potential rate limiting issues
- Poor performance and UX (constant re-renders)

**Fix:**
Use reasonable values:

```typescript
staleTime: 5 * 60 * 1000,  // 5 minutes
refetchInterval: 30 * 1000,  // 30 seconds
```

Or remove aggressive refetching entirely if not needed.

**Discussion Points:**

- React Query caching strategies
- When to use polling vs real-time updates (WebSockets/SSE)
- Performance monitoring and network tab inspection
- Balancing data freshness with performance

---

### Bug 4: CSS Grid Min-Width Too Large

**File:** `web/components/MetricsGrid.module.css` (line 22)
**Severity:** Medium - Responsive Design Issue

**Problem:**
Grid column min-width is set to 400px, which is too wide for tablets and small screens.

```css
grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
```

**Impact:**

- Horizontal scrolling on tablets (768px width)
- Horizontal scrolling on small laptops
- Poor mobile/tablet experience
- Layout breaks on common viewport sizes

**Fix:**
Reduce min-width to 280-320px:

```css
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
```

**Discussion Points:**

- Responsive design principles
- Common breakpoints (mobile: 375px, tablet: 768px, desktop: 1024px+)
- CSS Grid vs Flexbox for responsive layouts
- Testing across different viewport sizes
- Mobile-first design approach

---

### Bug 5: Missing GraphQL Field in Query

**File:** `web/lib/queries.ts` (line 14)
**Severity:** Medium - Integration Issue

**Problem:**
The GraphQL query doesn't request the `status` field, but the TypeScript `Metric` interface expects it (defined in `types/metric.ts`).

```graphql
query GetMetrics($companyName: String!) {
  metrics(companyName: $companyName) {
    id
    name
    value
    # ... other fields
    # status field is missing
  }
}
```

**Impact:**

- `status` field is undefined at runtime
- Type/runtime mismatch
- Could cause issues if status filtering is added
- Silent failure - no TypeScript error because it's a GraphQL query string

**Fix:**
Add `status` to the query fields:

```graphql
query GetMetrics($companyName: String!) {
  metrics(companyName: $companyName) {
    id
    name
    value
    # ... other fields
    status
  }
}
```

**Discussion Points:**

- GraphQL type safety challenges
- Code generation tools (GraphQL Code Generator)
- Integration testing between frontend and backend
- Type safety across API boundaries

---

## Testing the Bugs

### How Candidates Can Discover Each Bug:

1. **Database Bug**:

   - Check network tab for slow API responses
   - Add console logs to see data volume
   - Profile the API endpoint
   - Look at the Prisma query structure

2. **CSS Hover Bug**:

   - Hover over metric cards (nothing happens)
   - Inspect element in browser DevTools
   - Check CSS specificity in computed styles

3. **React Query Bug**:

   - Open browser network tab
   - Watch requests fire every second
   - Check React Query DevTools

4. **Grid Bug**:

   - Resize browser window to tablet size (~768px)
   - Observe horizontal scrollbar appears
   - Test responsive design

5. **GraphQL Field Bug**:
   - Check TypeScript types vs actual data
   - Console.log the data to see undefined status
   - Compare query with schema/types

---

## Interview Flow Suggestions

### Good Starting Points:

1. "Let's run the app and see what we notice"
2. "Can you check the network tab while using the app?"
3. "Try resizing the browser window"
4. "Hover over the metric cards"

### If Stuck, Provide Hints:

- "How many times is the API being called?"
- "Does the hover effect work on the cards?"
- "What happens when you make the window narrower?"
- "How is the database query filtering data?"

### Evaluation Criteria:

- **Problem identification**: Can they spot the issues?
- **Root cause analysis**: Do they understand why it's a problem?
- **Solution proposal**: Can they suggest appropriate fixes?
- **Trade-offs discussion**: Do they consider alternatives and impacts?
- **Testing strategy**: How would they verify the fix?

---

## Expected Fixes Summary

| Bug              | File                   | Lines | Difficulty | Time to Fix |
| ---------------- | ---------------------- | ----- | ---------- | ----------- |
| #1 Database      | resolvers.ts           | 42-48 | Medium     | 2 min       |
| #2 CSS Hover     | MetricCard.module.css  | 10    | Easy       | 30 sec      |
| #3 React Query   | MetricsGrid.tsx        | 16-17 | Easy       | 1 min       |
| #4 CSS Grid      | MetricsGrid.module.css | 22    | Easy       | 30 sec      |
| #5 GraphQL Field | queries.ts             | 14    | Easy       | 30 sec      |

**Total Time:** ~5-10 minutes to fix all bugs (after identification)

---

## Good Candidate Will:

- ✅ Find at least 3-4 bugs
- ✅ Explain the impact of each bug
- ✅ Propose appropriate fixes
- ✅ Discuss testing strategies
- ✅ Consider performance implications
- ✅ Use browser DevTools effectively

## Red Flags:

- ❌ Can't spot obvious visual bugs
- ❌ No awareness of performance issues
- ❌ Doesn't think about user impact
- ❌ Can't use browser developer tools
- ❌ No testing strategy
