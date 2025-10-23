import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_CODESPACE_NAME ? `https://${process.env.NEXT_PUBLIC_CODESPACE_NAME}-5000.app.github.dev/graphql` :
  `http://localhost:5000/graphql`;

export const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});

