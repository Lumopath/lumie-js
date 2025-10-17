import { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';

export async function handleSSE(req: Request, res: Response, apolloServer: ApolloServer) {
  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  // Handle client disconnect
  req.on('close', () => {
    res.end();
  });

  try {
    // Wait 5 seconds before sending update
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Fetch metrics using GraphQL
    const query = `
      query GetMetrics {
        metrics(companyName: "Lumopath") {
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

    const result = await apolloServer.executeOperation({
      query
    });

    if (result.body.kind === 'single') {
      const metricsData = result.body.singleResult.data?.metrics || [];

      // Send metrics update
      const data = {
        type: 'metrics_update',
        metrics: metricsData,
        timestamp: new Date().toISOString()
      };

      res.write(`event: metrics\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);

      // Send complete event
      res.write(`event: complete\n`);
      res.write(`data: ${JSON.stringify({ status: 'complete' })}\n\n`);
    }

    res.end();
  } catch (error) {
    console.error('SSE Error:', error);
    res.end();
  }
}

