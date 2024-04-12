const db = require('../models');
const { addScore, removeScore } = require('../utils/scoring');
const Likes = db.Likes;

// Retourne les commentaire disponible dans la BDD avec un offset et une limite
exports.getLikesCount = async (request, reply) => {
  try {
    const likes = await Likes.findAll({
      attributes: [
        [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'total']
      ],
      where: {
        id_article: request.params.id
      }
    });
    reply.send(likes);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne les commentaire disponible dans la BDD avec un offset et une limite
exports.getLikesByUser = async (request, reply) => {
  try {
    const likes = await Likes.findAll({
      where: {
        id_user: request.ctx.users
      }
    });
    reply.send(likes);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne les commentaire disponible dans la BDD avec un offset et une limite
exports.getLikesCountByCommunity = async (request, reply) => {
  try {
    const likes = await Likes.findAll({
      attributes: [
        [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'total']
      ],
      where: {
        id_community: request.params.id
      }
    });
    reply.send(likes);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Créer un like dans la BDD
exports.createLikes = async (request, reply) => {
  // On récupère les informations utilisateur en fonction de sont id décrypté dans le token
  const newBody = { id_user: request.ctx.users, ...request.body };

  try {
    await Likes.create(newBody);
    addScore(db, request.ctx.users, 'like');
    reply.send({ message: 'success' });
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Supprime un like dans la BDD (logiquement pas de suppression mais un paramètre de delete. pour le projet on supprime par simplicité)
exports.deleteLikes = async (request, reply) => {
  try {
    await Likes.destroy({
      where: { id_article: request.params.id, id_user: request.ctx.users },
    });

    removeScore(db, request.ctx.users, 'like');
    reply.send({ message: 'success' });
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};
