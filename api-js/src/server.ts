import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { handleSSE } from './sse';

const PORT = process.env.PORT || 3001;

async function startServer() {
  const app = express();

  // Apollo Server setup
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  // Middleware
  app.use(cors({
    origin: '*',
    credentials: false
  }));
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // SSE streaming endpoint
  app.get('/stream', (req, res) => {
    handleSSE(req, res, apolloServer);
  });

  // GraphQL endpoint
  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req }),
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
    console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log(`📡 SSE stream: http://localhost:${PORT}/stream`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

