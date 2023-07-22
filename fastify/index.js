// Init Fastify
import Fastify from 'fastify';
import dbConnector from './plugins/db-connector.js';
import firstRoute from './routes/first-route.js';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(dbConnector);
fastify.register(firstRoute);

// Run the server
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
