'use client';

import { useQuery } from '@tanstack/react-query';
import { graphQLClient } from '@/lib/graphql-client';
import { GET_METRICS } from '@/lib/queries';
import { MetricsResponse } from '@/types/metric';
import MetricCard from './MetricCard';
import styles from './MetricsGrid.module.css';

export default function MetricsGrid() {
  const { data, isLoading, error } = useQuery<MetricsResponse>({
    queryKey: ['metrics', 'Lumopath'],
    queryFn: async () => {
      return graphQLClient.request(GET_METRICS, { companyName: 'Lumopath' });
    },
    staleTime: 0,
    refetchInterval: 1000,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h3>Error loading metrics</h3>
        <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
      </div>
    );
  }

  if (!data?.metrics || data.metrics.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No metrics available</p>
      </div>
    );
  }

  // Group metrics by category
  const categories = ['revenue', 'customers', 'growth', 'financial', 'engagement'];
  const groupedMetrics = categories.map(category => ({
    category,
    metrics: data.metrics.filter(m => m.category === category)
  })).filter(group => group.metrics.length > 0);

  return (
    <div className={styles.container}>
      {groupedMetrics.map(({ category, metrics }) => (
        <div key={category} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <div className={styles.grid}>
            {metrics.map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

