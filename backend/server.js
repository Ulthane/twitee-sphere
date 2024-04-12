// Import des routes
const routes = [
  require('./app/routes/users.route'),
  require('./app/routes/articles.route'),
  require('./app/routes/comentaries.route'),
  require('./app/routes/likes.route'),
  require('./app/routes/communities.route'),
  require('./app/routes/friends.route'),
  require('./app/routes/score.route')
]

// Définition de l'application
const cors = require('@fastify/cors');
const fastify = require('fastify')({
  logger: true,
});

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Health endpoint
fastify.get('/alive', async (request, reply) => {
  reply.send({ message: 'success' });
});

// Définition des routes
routes.forEach(route => {
  route.forEach((path, index) => {
    fastify.route(path);
  })
})

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
