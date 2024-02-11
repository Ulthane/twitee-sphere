import Fastify from 'fastify';

// LOGGER
const fastify = Fastify({
  logger: true,
});

// HEALTHCHECK
fastify.get('/alive', function (request, reply) {
  reply.send('Le service fonctionne correctement');
});

// Listener du serveur
fastify.listen({ port: process.env.SRVPORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Le service écoute sur le port ${process.env.SRVPORT}`);
});
