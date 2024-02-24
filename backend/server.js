// Import des routes
const usersRoutes = require('./app/routes/users.route');
const articlesRoutes = require('./app/routes/articles.route');

// Définition de l'application
const cors = require('@fastify/cors');
const fastify = require('fastify')({
  logger: true,
});

fastify.register(cors, {
  origin: '*',
  methods: ["GET", "POST"]
});

// Health endpoint
fastify.get('/alive', async (request, reply) => {
  reply.send({ message: 'success' });
});

//Loop over each route
usersRoutes.forEach((route, index) => {
  fastify.route(route);
});

articlesRoutes.forEach((route, index) => {
  fastify.route(route);
});

// Listener
fastify.listen(
  { port: process.env.SRVPORT, host: '0.0.0.0' },
  async (err, address) => {
    if (err) {
      await fastify.log.error(err);
      process.exit(1);
    }
  }
);
