import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const sampleMetrics = [
    {
      companyName: 'Lumopath',
      name: 'Annual Recurring Revenue (ARR)',
      value: 2850000,
      unit: 'USD',
      description: 'Total annual recurring revenue from all active subscriptions',
      category: 'revenue',
      recordedAt: new Date(),
      status: 'The status of the metric is Enabled for June 2025'
    },
    {
      companyName: 'Lumopath',
      name: 'Monthly Recurring Revenue (MRR)',
      value: 237500,
      unit: 'USD',
      description: 'Monthly recurring revenue normalized from all subscriptions',
      category: 'revenue',
      recordedAt: new Date(),
      status: 'The status of the metric is Active for June 2025'
    },
    {
      companyName: 'Lumopath',
      name: 'Active Accounts',
      value: 1847,
      unit: 'count',
      description: 'Number of accounts with active subscriptions',
      category: 'customers',
      recordedAt: new Date(),
      status: 'The status of the metric is Active for June 2025'
    },
    {
      companyName: 'Lumopath',
      name: 'Customer Acquisition Cost (CAC)',
      value: 485,
      unit: 'USD',
      description: 'Average cost to acquire a new customer',
      category: 'financial',
      recordedAt: new Date(),
      status: 'The status of the metric is Active for June 2025'
    },
    {
      companyName: 'Lumopath',
      name: 'Monthly Churn Rate',
      value: 3.2,
      unit: 'percentage',
      description: 'Percentage of customers who canceled their subscription this month',
      category: 'customers',
      recordedAt: new Date(),
      status: 'The status of the metric is Active for June 2025'
    },
    {
      companyName: 'Lumopath',
      name: 'Customer Lifetime Value (LTV)',
      value: 4250,
      unit: 'USD',
      description: 'Average revenue expected from a customer over their lifetime',
      category: 'financial',
      recordedAt: new Date(),
      status: 'The status of the metric is Active for June 2025'
    },
    {
      companyName: 'Lumopath',
      name: 'Net Revenue Retention (NRR)',
      value: 112.8,
      unit: 'percentage',
      description: 'Revenue retention rate including expansion revenue',
      category: 'growth',
      recordedAt: new Date(),
      status: 'The status of the metric is Active for June 2025'
    },
    {
      companyName: 'Lumopath',
      name: 'Daily Active Users',
      value: 12450,
      unit: 'count',
      description: 'Number of unique users active in the last 24 hours',
      category: 'engagement',
      recordedAt: new Date(),
      status: 'The status of the metric is Enabled for June 2025'
    },
    {
      companyName: 'Lumopath',
      name: 'Gross Margin',
      value: 78.5,
      unit: 'percentage',
      description: 'Gross profit margin after direct costs',
      category: 'financial',
      recordedAt: new Date(),
      status: 'The status of the metric is Active for June 2025'
    },
    {
      companyName: 'Lumopath',
      name: 'Monthly Growth Rate',
      value: 8.3,
      unit: 'percentage',
      description: 'Month-over-month growth rate in revenue',
      category: 'growth',
      recordedAt: new Date(),
      status: 'The status of the metric is active for June 2025'
    }
  ];

  for (const metric of sampleMetrics) {
    await prisma.metric.upsert({
      where: {
        id: sampleMetrics.indexOf(metric) + 1
      },
      update: metric,
      create: metric
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${sampleMetrics.length} metrics`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

