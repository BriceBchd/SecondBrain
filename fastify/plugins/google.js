import fastify from 'fastify';
import oauthPlugin from '@fastify/oauth2';
import fastifyPlugin from 'fastify-plugin';

const GoogleAuth = async (fastify) => {
  try {
    // Register oauth plugin
    fastify.register(oauthPlugin, {
      name: 'googleOAuth2',
      scope: ['profile', 'email'],
      credentials: {
        client: {
          id: process.env.GOOGLE_CLIENT_ID,
          secret: process.env.GOOGLE_CLIENT_SECRET,
        },
        auth: oauthPlugin.GOOGLE_CONFIGURATION,
      },
      startRedirectPath: '/user/login/google',
      callbackUri: 'http://localhost:3000/user/login/google/callback',
    });

    // // Define the login route
    // fastify.get('/user/login/google', async (request, reply) => {
    //   reply.redirect('/auth/googleOAuth2');
    // });

    // Define the callback route
    fastify.get('/user/login/google/callback', async (request, reply) => {
      const token = request.oauth2Token;
      reply.send({ token });
    });
  } catch (error) {
    fastify.log.error(error);
  }
};

export default fastifyPlugin(GoogleAuth);
