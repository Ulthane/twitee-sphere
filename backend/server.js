// Import des routes
const usersRoutes = require('./app/routes/users.route');
const articlesRoutes = require('./app/routes/articles.route');
const comentariesRoutes = require('./app/routes/comentaries.route');
const likesRoute = require('./app/routes/likes.route');

// Définition de l'application
const cors = require('@fastify/cors');
const fastify = require('fastify')({
  logger: true,
});

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST'],
});

// Health endpoint
fastify.get('/alive', async (request, reply) => {
  reply.send({ message: 'success' });
});

// Route pour les utilisateurs
usersRoutes.forEach((route, index) => {
  fastify.route(route);
});
// Route pour les articles
articlesRoutes.forEach((route, index) => {
  fastify.route(route);
});
// Route pour les commentaires
comentariesRoutes.forEach((route, index) => {
  fastify.route(route);
});
// Route pour les likes
likesRoute.forEach((route, index) => {
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
