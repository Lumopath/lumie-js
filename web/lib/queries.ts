import { gql } from 'graphql-request';

export const GET_METRICS = gql`
  query GetMetrics($companyName: String!) {
    metrics(companyName: $companyName) {
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
`;

export const GET_METRIC = gql`
  query GetMetric($id: ID!) {
    metric(id: $id) {
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
`;

export const GET_METRICS_BY_CATEGORY = gql`
  query GetMetricsByCategory($category: String!) {
    metricsByCategory(category: $category) {
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
`;

