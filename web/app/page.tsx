import MetricsGrid from '@/components/MetricsGrid';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Lumie</h1>
          <p className={styles.subtitle}>Business Metrics Dashboard</p>
        </header>

        <MetricsGrid />
      </div>
    </main>
  );
}

