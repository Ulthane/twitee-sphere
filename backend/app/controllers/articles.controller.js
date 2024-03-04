const db = require('../models');
const Articles = db.Articles;
const Users = db.Users;

// Retourne les articles disponible dans la BDD avec un offset et une limite
exports.getArticlesWithOffset = async (request, reply) => {
  // On retourne tout les articles avec un offset
  try {
    const articles = await Articles.findAll({
      offset: parseInt(request.query.offset),
      limit: parseInt(request.query.limit),
      include: [
        {
          model: Users,
          attributes: ['firstname', 'lastname', 'img_src', 'id_communities'],
        },
      ],
      attributes: ['id_articles', 'description', 'img_src', 'user.firstname'],
    });
    reply.send(articles);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne les articles disponible dans la BDD avec un offset et une limite pour un utilisateur
exports.getArticlesWithOffsetAndUserId = async (request, reply) => {
  try {
    const articles = await Articles.findAll({
      offset: 0,
      limit: 30,
      include: [
        {
          model: Users,
          attributes: ['firstname', 'lastname', 'img_src', 'id_communities'],
        },
      ],
      attributes: ['id_articles', 'description', 'img_src', 'user.firstname'],
      where: {
        id_user: request.params.id,
      },
    });
    reply.send(articles);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Créer un article dans la BDD
exports.createArticles = async (request, reply) => {
  // On récupère les informations utilisateur en fonction de sont id décrypté dans le token
  const newBody = { id_user: request.ctx.users, ...request.body };

  try {
    await Articles.create(newBody);
    reply.send({ message: 'success' });
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Modifie un article dans la BDD
exports.modifyArticles = async (request, reply) => {
  /* 
  On met a jour l'article en écrivant un body et en passant un ID d'article
  */
  try {
    await Articles.update(
      { description: request.body.description },
      {
        where: { id_articles: request.params.id },
      }
    );
    reply.send({ message: 'success' });
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Supprime un article dans la BDD (logiquement pas de suppression mais un paramètre de delete. pour le projet on supprime par simplicité)
exports.deleteArticles = async (request, reply) => {
  try {
    await Articles.destroy({
      where: { id_articles: request.params.id },
    });
    reply.send({ message: 'success' });
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};
