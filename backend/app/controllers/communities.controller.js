const db = require('../models');
const Communities = db.Communities;
const Users = db.Users;

// Retourne les communauté disponible dans la BDD avec un offset et une limite
exports.getCommunitiesWithOffset = async (request, reply) => {
  try {
    const communities = await Communities.findAll({
      offset: parseInt(request.query.offset),
      limit: parseInt(request.query.limit),
      include: [
        {
          model: Users,
          attributes: ['firstname', 'lastname', 'surname', 'email', 'img_src', 'id_communities'],
        },
      ],
    });
    reply.send(communities);
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Créer une communauté dans la BDD
exports.createCommunities = async (request, reply) => {
  const newBody = { id_user: request.ctx.users, ...request.body };

  try {
    const communities = await Communities.create(newBody);
    console.log(communities);
    await Users.update(
      {
        id_communities: communities.id_communities,
      },
      {
        where: {
          id_user: request.ctx.users,
        },
      }
    );
    reply.send({ message: 'success' });
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Modifie une communauté dans la BDD
exports.modifyCommunities = async (request, reply) => {
  try {
    await Communities.update(
      { description: request.body.description },
      {
        where: { id_communities: request.params.id },
      }
    );
    reply.send({ message: 'success' });
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Supprime une communauté dans la BDD (logiquement pas de suppression mais un paramètre de delete. pour le projet on supprime par simplicité)
exports.deleteCommunities = async (request, reply) => {
  try {
    await Communities.destroy({
      where: { id_communities: request.params.id },
    });
    reply.send({ message: 'success' });
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};
