import FastifyPlugin from 'fastify-plugin';
import User from '../models/user.js';
import mongoose from 'mongoose';
const models = { User };

const ConnectDB = async (fastify, options) => {
  try {
    mongoose.connection.on('connected', () => {
      fastify.log.info({ actor: 'MongoDB' }, 'Connected');
    });
    mongoose.connection.on('error', (error) => {
      fastify.log.error({ actor: 'MongoDB' }, error);
    });
    mongoose.connection.on('disconnected', () => {
      fastify.log.info({ actor: 'MongoDB' }, 'Disconnected');
    });

    const url = process.env.MONGO_URI;
    const user = process.env.DB_USERNAME;
    const pass = process.env.DB_PASSWORD;

    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user,
      pass,
    });
    db.models = models;
  } catch (error) {
    fastify.log.error(error);
  }
};

export default FastifyPlugin(ConnectDB);
