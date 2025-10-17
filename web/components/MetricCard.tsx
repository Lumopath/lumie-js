import { Metric } from '@/types/metric';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  metric: Metric;
}

export default function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className={`${styles.card} ${styles[metric.category]}`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{metric.name}</h3>
        <span className={styles.category}>{metric.category}</span>
      </div>
      <div className={styles.value}>{metric.formattedValue}</div>
      {metric.description && (
        <p className={styles.description}>{metric.description}</p>
      )}
    </div>
  );
}

