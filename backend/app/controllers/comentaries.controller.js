const db = require('../models');
const { addScore, removeScore } = require('../utils/scoring');
const Comentaries = db.Comentaries;
const Users = db.Users;
const Articles = db.Articles;

// Retourne les commentaire disponible dans la BDD avec un offset et une limite
exports.getComentariesWithOffset = async (request, reply) => {
  try {
    const comentaries = await Comentaries.findAll({
      offset: parseInt(request.query.offset),
      limit: parseInt(request.query.limit),
      attributes: ['id_comentaries', 'description', 'createdAt'],
      include: [
        {
          model: Users,
          attributes: ['id_user', 'firstname', 'lastname', 'img_src', 'id_communities'],
        },
        {
          model: Articles,
          attributes: ['id_articles'],
          where: {
            id_articles: request.query.id
          }
        },
      ],

    });
    reply.send(comentaries);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Créer un commentaire dans la BDD
exports.createComentaries = async (request, reply) => {
  // On récupère les informations utilisateur en fonction de sont id décrypté dans le token
  const newBody = { id_user: request.ctx.users, ...request.body };

  try {
    await Comentaries.create(newBody);
    reply.send({ message: 'success' });
    addScore(db, request.ctx.users, 'commentary');
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Modifie un commentaire dans la BDD
exports.modifyComentaries = async (request, reply) => {
  /* 
  On met a jour le commentaire en écrivant un body et en passant un ID d'article
  */
  try {
    await Comentaries.update(
      { description: request.body.description },
      {
        where: { id_comentaries: request.params.id },
      }
    );
    reply.send({ message: 'success' });
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Supprime un commentaire dans la BDD (logiquement pas de suppression mais un paramètre de delete. pour le projet on supprime par simplicité)
exports.deleteComentaries = async (request, reply) => {
  try {
    await Comentaries.destroy({
      where: { id_comentaries: request.params.id },
    });
    reply.send({ message: 'success' });
    removeScore(db, request.ctx.users, 'commentary');
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};
