const db = require('../models');
const Communities = db.Communities;

// Retourne les communauté disponible dans la BDD avec un offset et une limite
exports.getTopScore = async (request, reply) => {
    try {
      const communities = await Communities.findAll({
        limit: 4,
        order: [['score', 'DESC']],
      });
      reply.send(communities);
    } catch (err) {
      reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
    }
  };