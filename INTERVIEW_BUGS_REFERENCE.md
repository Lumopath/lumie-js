# Pair Programming Exercise - Bug Reference

This document contains the list of intentional bugs introduced for the pair programming exercise. **DO NOT share with candidates.**

---

## Bug List (8 Total)

### Bug 1: Database Query Fetches All Records

**File:** `api-js/src/graphql/resolvers.ts` (lines 42-48)
**Severity:** Critical - Performance Issue

**Problem:**
The `metrics` resolver fetches ALL metrics from the database without a WHERE clause, then filters by company in JavaScript memory.

```typescript
const allMetrics = await prisma.metric.findMany({
  orderBy: { recordedAt: "desc" },
});
const companyMetrics = allMetrics.filter((m) => m.companyName === companyName);
```

**Impact:**

- Loads 1.4 million records into memory (**19+ seconds per query!**)
- Doesn't use database indexes on `companyName` field
- Massive network overhead transferring all records
- Combined with Bug #3, makes app completely unusable

**Fix:**
Add WHERE clause to filter at database level:

```typescript
const allMetrics = await prisma.metric.findMany({
  where: { companyName: companyName },
  orderBy: { recordedAt: "desc" },
});
// Remove the filter line
```

**Discussion Points:**

- Database indexes and query optimization
- When to filter in database vs application layer
- Memory usage implications
- N+1 queries and similar patterns

---

### Bug 2: All Cards Stack on Top of Each Other

**File:** `web/components/MetricCard.module.css` (lines 8-10)
**Severity:** Critical - Layout Completely Broken

**Problem:**
Cards have `position: absolute` with `top: 0` and `left: 0`, causing all cards to stack on top of each other at the same position.

```css
.card {
  /* ... */
  position: absolute;
  top: 0;
  left: 0;
}
```

**Impact:**

- **All metric cards overlap in the same spot**
- Only the last card is visible
- Layout is completely broken
- Impossible to see or interact with most metrics

**Fix:**
Remove the absolute positioning:

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid var(--category-color);
  /* Remove: position: absolute; top: 0; left: 0; */
}
```

**Discussion Points:**

- CSS positioning (absolute vs relative vs static vs fixed)
- How absolute positioning removes elements from normal flow
- Grid/flexbox container behavior with positioned children
- When to use different positioning modes

---

### Bug 3: React Query Refetches Every Second

**File:** `web/components/MetricsGrid.tsx` (lines 16-17)
**Severity:** Critical - Performance Issue

**Problem:**
React Query configured to refetch every second with no stale time, causing constant API requests.

```typescript
staleTime: 0,
refetchInterval: 1000,
```

**Impact:**

- API called every second (impossible with 19-second response time!)
- **Queued requests pile up endlessly**
- Browser network tab shows constant pending requests
- Server completely overwhelmed
- Battery drain on mobile devices
- App is completely unusable

**Fix:**
Use reasonable values or remove polling:

```typescript
staleTime: 5 * 60 * 1000,  // 5 minutes
refetchInterval: 30 * 1000,  // 30 seconds (or remove entirely)
```

**Discussion Points:**

- React Query caching strategies
- When to use polling vs WebSockets/SSE
- Performance monitoring and network tab inspection
- Balancing data freshness with performance

---

### Bug 4: Grid Changed to Flex Without Wrap

**File:** `web/components/MetricsGrid.module.css` (lines 21-22)
**Severity:** High - Layout Issue

**Problem:**
Grid changed to `display: flex` without `flex-wrap`, causing all cards to try to fit in a single row.

```css
.grid {
  display: flex;
  gap: 24px;
}
```

**Impact:**

- **All cards forced into single horizontal row**
- Horizontal scrolling required
- Cards too narrow to display properly
- Poor experience on all screen sizes

**Fix:**
Restore grid layout:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
```

Or add flex-wrap:

```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
```

**Discussion Points:**

- CSS Grid vs Flexbox use cases
- flex-wrap property importance
- Responsive layout strategies
- When to use each display mode

---

### Bug 5: Category Titles Fixed in Center of Screen

**File:** `web/components/MetricsGrid.module.css` (lines 18-21)
**Severity:** High - Visual Issue

**Problem:**
Category titles have `position: fixed` with `top: 50%` and `left: 50%`, causing all titles to overlay in the center of the screen.

```css
.categoryTitle {
  /* ... */
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
}
```

**Impact:**

- **All category titles overlap in screen center**
- Blocks content underneath
- Unreadable due to overlap
- Stays fixed while scrolling (annoying)

**Fix:**
Remove fixed positioning:

```css
.categoryTitle {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 24px 0;
  text-transform: capitalize;
  letter-spacing: -0.5px;
  /* Remove: position: fixed; top: 50%; left: 50%; z-index: 9999; */
}
```

**Discussion Points:**

- Fixed positioning and when it's appropriate
- z-index stacking contexts
- Overlay patterns
- Position: sticky vs fixed

---

### Bug 6: Metric Values Are White Text on White Background

**File:** `web/components/MetricCard.module.css` (line 48)
**Severity:** High - Accessibility Issue

**Problem:**
The metric value text color is set to `white` on a white card background, making values invisible.

```css
.value {
  font-size: 32px;
  font-weight: 700;
  color: white; /* White on white! */
  /* ... */
}
```

**Impact:**

- **Metric values are invisible**
- Main data of the dashboard can't be read
- Fails accessibility contrast requirements
- Looks broken

**Fix:**
Change to dark color:

```css
.value {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 12px;
  line-height: 1.2;
}
```

**Discussion Points:**

- Color contrast and accessibility
- WCAG guidelines
- Testing with browser DevTools accessibility tab
- Color blindness considerations

---

### Bug 7: Container Uses Row Flexbox Breaking Layout

**File:** `web/app/page.module.css` (lines 10-11)
**Severity:** Medium - Layout Issue

**Problem:**
Main container has `display: flex` with `flex-direction: row`, causing header and content to layout side-by-side instead of stacked vertically.

```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
```

**Impact:**

- Header and metrics grid appear side-by-side
- Compressed horizontal space
- Awkward layout
- Not the intended design

**Fix:**
Remove the flex properties or change to column:

```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  /* Remove flex properties, or use: */
  /* display: flex; flex-direction: column; */
}
```

**Discussion Points:**

- Flexbox direction and default behavior
- Block vs flex layout
- When flex is needed vs when it's not

---

### Bug 8: Missing React Key Warning

**File:** `web/components/MetricsGrid.tsx` (line 56)
**Severity:** Low - React Warning

**Problem:**
The category section div is missing a `key` prop in the map function.

```typescript
{
  groupedMetrics.map(({ category, metrics }) => (
    <div className={styles.categorySection}>
      {" "}
      {/* Missing key! */}
      <h2 className={styles.categoryTitle}>{category}</h2>
      ...
    </div>
  ));
}
```

**Impact:**

- React warning in console
- Potential re-render issues
- Poor React performance
- Console noise

**Fix:**
Add key prop:

```typescript
{
  groupedMetrics.map(({ category, metrics }) => (
    <div key={category} className={styles.categorySection}>
      <h2 className={styles.categoryTitle}>{category}</h2>
      ...
    </div>
  ));
}
```

**Discussion Points:**

- Why React needs keys
- Key selection best practices
- Performance implications
- Console warning importance

---

## Testing the Bugs

### How Candidates Can Discover Each Bug:

1. **Database Bug**:

   - Open network tab - see **19+ second** response times
   - Check browser console for slow queries
   - Notice initial load takes forever

2. **Cards Stacking Bug**:

   - **Immediately visible** - only one card shows
   - Inspect element to see absolute positioning
   - Open DevTools to examine layout

3. **Refetch Bug**:

   - Open network tab
   - See **constant pending requests** piling up
   - App never finishes loading

4. **Flex Without Wrap Bug**:

   - **Immediately visible** - horizontal scroll
   - All cards in single row
   - Resize window to see issue persist

5. **Fixed Titles Bug**:

   - **Immediately visible** - titles in screen center
   - Titles don't scroll with content
   - All titles overlap each other

6. **White Text Bug**:

   - **Immediately visible** - can't read values
   - Numbers are invisible
   - Only labels and descriptions visible

7. **Row Container Bug**:

   - **Immediately visible** - weird side-by-side layout
   - Header next to content instead of above

8. **Missing Key Bug**:
   - Open browser console
   - See React warning about missing keys

---

## Interview Flow Suggestions

### Excellent Starting Point:

"Let's run the app and see what we notice"

The bugs are now **extremely obvious** - candidates will immediately see:

- Only one metric card visible (all stacked)
- Metric values invisible (white on white)
- Category titles all in center of screen
- Horizontal scrolling required
- Header and content side-by-side
- Browser console React warnings
- Network tab shows constant pending 19-second requests

### If Stuck, Provide Hints:

- "What do you see on the screen?"
- "Can you read the metric values?"
- "Where are the category titles?"
- "Check the browser console"
- "Look at the network tab"
- "Try inspecting a card with DevTools"

### Evaluation Criteria:

- **Problem identification**: Can they spot the obvious visual breaks?
- **Root cause analysis**: Can they find the CSS/code causing issues?
- **Solution proposal**: Can they suggest appropriate fixes?
- **Systematic approach**: Do they check console, network, and inspect elements?
- **Priority**: Do they address critical issues first?

---

## Expected Fixes Summary

| Bug                   | File                   | Lines | Difficulty | Time to Fix | Visibility    |
| --------------------- | ---------------------- | ----- | ---------- | ----------- | ------------- |
| #1 Database           | resolvers.ts           | 42-48 | Medium     | 2 min       | Network tab   |
| #2 Stacked Cards      | MetricCard.module.css  | 8-10  | Easy       | 30 sec      | **IMMEDIATE** |
| #3 Aggressive Refetch | MetricsGrid.tsx        | 16-17 | Easy       | 30 sec      | Network tab   |
| #4 Flex No Wrap       | MetricsGrid.module.css | 21-22 | Easy       | 1 min       | **IMMEDIATE** |
| #5 Fixed Titles       | MetricsGrid.module.css | 18-21 | Easy       | 30 sec      | **IMMEDIATE** |
| #6 White Text         | MetricCard.module.css  | 48    | Easy       | 10 sec      | **IMMEDIATE** |
| #7 Row Container      | page.module.css        | 10-11 | Easy       | 30 sec      | **IMMEDIATE** |
| #8 Missing Key        | MetricsGrid.tsx        | 56    | Easy       | 10 sec      | Console       |

**Total Time:** ~5-7 minutes to fix all bugs (after identification)

---

## Good Candidate Will:

- ✅ Immediately notice the visual breaks
- ✅ Open browser DevTools to investigate
- ✅ Check console for warnings
- ✅ Check network tab for API issues
- ✅ Find at least 5-6 bugs
- ✅ Explain the impact of each bug
- ✅ Propose appropriate fixes
- ✅ Prioritize critical visual issues first

## Red Flags:

- ❌ Doesn't notice obvious visual problems
- ❌ Doesn't open DevTools
- ❌ Doesn't check console or network tab
- ❌ Can't explain CSS positioning
- ❌ No systematic debugging approach
- ❌ Doesn't prioritize by severity
