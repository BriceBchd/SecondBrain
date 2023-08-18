// Init Fastify
import Fastify from 'fastify'
import dbConnector from './plugins/db-connector.js'
import usersRoutes from './routes/users.js'
import pageRoutes from './routes/page.js'
import googleAuth from './plugins/google.js'
import dotenv from 'dotenv'
import fastifyCors from '@fastify/cors'

dotenv.config()

const fastify = Fastify({
  logger: true,
})

fastify.register(fastifyCors, {
  origin: 'http://localhost:4000',
})

// Register plugins
fastify.register(dbConnector)
fastify.register(googleAuth)

// Register routes
fastify.register(usersRoutes)
fastify.register(pageRoutes)

// Run the server
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
