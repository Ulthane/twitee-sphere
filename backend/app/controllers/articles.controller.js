const { where } = require('sequelize');
const db = require('../models');
const { removeScore, addScore } = require('../utils/scoring');
const Articles = db.Articles;
const Users = db.Users;
const Likes = db.Likes;

// Retourne les articles disponible dans la BDD avec un offset et une limite
exports.getArticlesWithOffset = async (request, reply) => {
  const allPromise = [];
  // On retourne tout les articles avec un offset
  try {
    const articles = await Articles.findAll({
      offset: parseInt(request.query.offset),
      limit: parseInt(request.query.limit),
      include: [
        {
          model: Users,
          attributes: ['id_user', 'firstname', 'lastname', 'img_src', 'id_communities'],
        },
      ],
      attributes: ['id_articles', 'description', 'img_src'],
      order: [['createdAt', 'DESC']],
    });

    // Boucle
    articles.forEach((article) => {
      // On met tout nos promesse dans le tableau pour pouvoir ressortir le résultat après
      allPromise.push(
        new Promise(async (resolve, reject) => {
          const isLike = await Likes.findOne({
            attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('*')), 'total']],
            where: {
              id_user: request.ctx.users,
              id_article: article.id_articles,
            },
          });

          resolve({ ...article.dataValues, isLike: isLike.dataValues.total });
        })
      );
    });

    // ICI on va vérifier toutes les réponses des promesses pour envoyer la réponse
    const response = await Promise.all(allPromise);
    reply.send(response);
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
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
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne les articles disponible dans la BDD avec un offset et une limite pour des utilisateurs
exports.getArticlesWithOffsetAndMultipleUserId = async (request, reply) => {
  try {
    const articles = await Articles.findAll({
      offset: parseInt(request.query.offset),
      limit: parseInt(request.query.limit),
      include: [
        {
          model: Users,
          attributes: ['id_user', 'firstname', 'lastname', 'img_src', 'id_communities'],
        },
      ],
      attributes: ['id_articles', 'description', 'img_src', 'user.firstname'],
      where: {
        id_user: request.body,
      },
    });
    reply.send(articles);
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne le nombre d'article total en base
exports.getArticlesCount = async (request, reply) => {
  try {
    const result = await Articles.findAndCountAll({});
    reply.code(200).send({ total: result.count });
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Créer un article dans la BDD
exports.createArticles = async (request, reply) => {
  // On récupère les informations utilisateur en fonction de sont id décrypté dans le token
  const newBody = { id_user: request.ctx.users, ...request.body };

  try {
    await Articles.create(newBody);
    reply.send({ message: 'success' });

    addScore(db, request.ctx.users, 'article');
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
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
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Supprime un article dans la BDD (logiquement pas de suppression mais un paramètre de delete. pour le projet on supprime par simplicité)
exports.deleteArticles = async (request, reply) => {
  try {
    const count = await Likes.findAll({
      where: {
        id_article: request.params.id,
      },
    });

    if (count > 0) {
      reply.code(403).send({
        message: "Erreur, au moins un like est actif sur l'article.",
      });
      return false;
    }

    await Articles.destroy({
      where: { id_articles: request.params.id },
    });
    removeScore(db, request.ctx.users, 'article');

    reply.send({ message: 'success' });
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};
