import fastifyPlugin from 'fastify-plugin';
import fastifyMongodb from '@fastify/mongodb';

async function dbConnector(fastify, options) {
  console.log(process.env.DB_USERNAME);
  const username = process.env.DB_USERNAME || 'root';
  const password = 'password';
  fastify.register(fastifyMongodb, {
    url: 'mongodb://mongodb:27017/second-brain?authSource=admin',
    auth: { username, password },
    tls: false,
    forceClose: true,
  });
}

export default fastifyPlugin(dbConnector);
