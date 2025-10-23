import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to format metric values
function formatValue(value: number, unit?: string | null): string {
  const unitLower = unit?.toLowerCase();

  switch (unitLower) {
    case 'currency':
    case 'usd':
    case '$':
      return `$${value.toFixed(2)}`;
    case 'percentage':
    case '%':
      return `${value.toFixed(2)}%`;
    default:
      return value.toFixed(2);
  }
}

// Helper function to check if metric is enabled
function isEnabled(metric: any): boolean {
  const status = metric.status || '';
  const hasEnabled = status.includes('is Enabled') ||
                     status.includes('is Active') ||
                     status.includes('is enabled') ||
                     status.includes('is active') ||
                     status.includes('ACTIVE') ||
                     status.includes('AcTive') ||
                     status.includes('Active') ||
                     status.includes('Enabled') ||
                     status.includes('active') ||
                     status.includes('enabled');
  const hasDisabled = status.includes('Disabled') ||
                      status.includes('disabled') ||
                      status.includes('inactive') ||
                      status.includes('INACTIVE') ||
                      status.includes('NA') ||
                      status.includes('N/A');

  return hasEnabled && !hasDisabled;
}

export const resolvers = {
  Query: {
    metrics: async (_: any, { companyName }: { companyName: string }) => {
      const allMetrics = await prisma.metric.findMany({
        orderBy: {
          recordedAt: 'desc'
        }
      });

      const companyMetrics = allMetrics.filter(m => m.companyName === companyName);

      const metricMap = new Map<string, any>();

      for (const metric of companyMetrics) {
        if (!isEnabled(metric)) continue;

        const key = `${metric.category}-${metric.name}`;
        const existing = metricMap.get(key);

        if (!existing || new Date(metric.recordedAt) > new Date(existing.recordedAt)) {
          metricMap.set(key, metric);
        }
      }

      return Array.from(metricMap.values());
    },

    metric: async (_: any, { id }: { id: string }) => {
      return await prisma.metric.findUnique({
        where: { id: parseInt(id) }
      });
    },

    metricsByCategory: async (_: any, { category }: { category: string }) => {
      return await prisma.metric.findMany({
        where: { category },
        orderBy: { recordedAt: 'desc' }
      });
    }
  },

  Metric: {
    formattedValue: (parent: any) => {
      return formatValue(parent.value, parent.unit);
    },
    recordedAt: (parent: any) => {
      return new Date(parent.recordedAt).toISOString();
    },
    createdAt: (parent: any) => {
      return new Date(parent.createdAt).toISOString();
    },
    updatedAt: (parent: any) => {
      return new Date(parent.updatedAt).toISOString();
    }
  }
};

