import gql from 'graphql-tag';

export const typeDefs = gql`
  type Metric {
    id: ID!
    name: String!
    value: Float!
    unit: String
    description: String
    category: String!
    recordedAt: String!
    formattedValue: String!
    status: String!
    companyName: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    metrics(companyName: String!): [Metric!]!
    metric(id: ID!): Metric
    metricsByCategory(category: String!): [Metric!]!
  }
`;

