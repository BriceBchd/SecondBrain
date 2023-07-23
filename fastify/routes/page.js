import Page from '../models/page.js';
import User from '../models/user.js';

// routes for pages with prefix page
const pageRoutes = async (fastify, options) => {
  const basePath = '/page';

  const requireAuth = async (request, reply) => {
    try {
      await User.verifyJWT(request, reply);
    } catch (error) {
      reply.code(401).send({ error: 'Not authorized' });
    }
  };

  fastify.route({
    method: 'GET',
    url: basePath + '/all',
    preHandler: requireAuth,
    handler: async (request, reply) => {
      try {
        const pages = await Page.find({});
        reply.send(pages);
      } catch (error) {
        reply.code(500).send({ error: error.message });
      }
    },
  });

  fastify.route({
    method: 'GET',
    url: basePath + '/:id',
    preHandler: requireAuth,
    handler: async (request, reply) => {
      try {
        const pageId = request.params.id;
        const page = await Page.findById(pageId);
        if (!page) {
          reply.code(404).send({ error: 'Page not found' });
        }
        reply.send(page);
      } catch (error) {
        reply.code(500).send({ error: error.message });
      }
    },
  });

  fastify.route({
    method: 'POST',
    url: basePath + '/create',
    preHandler: requireAuth,
    handler: async (request, reply) => {
      try {
        const page = new Page(request.body);
        await page.save();
        reply.send(page);
      } catch (error) {
        reply.code(500).send({ error: error.message });
      }
    },
  });

  fastify.route({
    method: 'PUT',
    url: basePath + '/:id',
    preHandler: requireAuth,
    handler: async (request, reply) => {
      try {
        const pageId = request.params.id;
        await Page.updateOne({ _id: pageId }, request.body);
        const page = await Page.findById(pageId);
        reply.send(page);
      } catch (error) {
        reply.code(500).send({ error: error.message });
      }
    },
  });
};

export default pageRoutes;
