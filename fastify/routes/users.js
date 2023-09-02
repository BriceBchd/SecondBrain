import FastifyAuth from '@fastify/auth';
import User from '../models/user.js';

const usersRoutes = async (fastify, options) => {
  const basePath = '/user';
  fastify
    .decorate('verifyJWT', async (request, reply) => {
      try {
        if (!request.headers.authorization) {
          throw new Error('Missing header authorization');
        }
        const [scheme, token] = request.headers.authorization.split(' ');
        if (scheme !== 'Bearer') {
          throw new Error('Invalid scheme');
        }
        const user = await User.findByToken(token);
        if (!user) {
          throw new Error('Invalid token');
        }
        request.user = user;
        request.token = token;
      } catch (error) {
        reply.code(401).send({ error: error.message });
      }
    })
    .decorate('verifyUserAndPassword', async (request, reply) => {
      try {
        if (!request.body.username || !request.body.password) {
          throw new Error('Missing username or password');
        }
        const { username, password } = request.body;
        const user = await User.findByCredentials(username, password);
        if (!user) {
          throw new Error('Invalid credentials');
        }
        request.user = user;
      } catch (error) {
        reply.code(401).send({ error: error.message });
      }
    })
    .register(FastifyAuth)
    .after(() => {
      fastify.route({
        method: 'POST',
        url: basePath + '/register',
        schema: {
          body: {
            type: 'object',
            required: ['username', 'password', 'email'],
            properties: {
              username: { type: 'string' },
              password: { type: 'string' },
              email: { type: 'string' },
            },
          },
        },
        handler: async (request, reply) => {
          try {
            const user = new User(request.body);
            await user.save();
            const token = await user.generateAuthToken();
            reply.code(201).send({ user, token });
          } catch (error) {
            reply.code(400).send({ error: error.message });
          }
        },
      });

      fastify.route({
        method: 'POST',
        url: basePath + '/login',
        preHandler: fastify.auth([fastify.verifyUserAndPassword]),
        handler: async (request, reply) => {
          try {
            const token = await request.user.generateAuthToken();
            reply.send({ user: request.user, token });
          } catch (error) {
            reply.code(400).send({ error: error.message });
          }
        },
      });

      fastify.route({
        method: 'GET',
        url: basePath + '/profile',
        preHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (request, reply) => {
          try {
            reply.send(request.user);
          } catch (error) {
            reply.code(500).send({ error: error.message });
          }
        },
      });

      fastify.route({
        method: 'POST',
        url: basePath + '/logout',
        preHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (request, reply) => {
          try {
            request.user.tokens = request.user.tokens.filter(
              (token) => token.token !== request.token
            );
            await request.user.save();
            reply.send();
          } catch (error) {
            reply.code(500).send({ error: error.message });
          }
        },
      });
    });
};

export default usersRoutes;
