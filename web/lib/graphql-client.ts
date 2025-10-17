import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_API_URL || `https://${process.env.NEXT_PUBLIC_CODESPACE_NAME}-3001.app.github.dev/graphql`;;

export const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});

