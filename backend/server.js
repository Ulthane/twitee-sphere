// Import des routes
const routes = require('./app/routes/users.route');

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
routes.forEach((route, index) => {
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
