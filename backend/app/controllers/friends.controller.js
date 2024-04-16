const db = require('../models');
const Friends = db.Friends;
const Users = db.Users;

// Créer un article dans la BDD
exports.createFriends = async (request, reply) => {
  const { friend } = request.body;
  // On récupère les informations utilisateur en fonction de sont id décrypté dans le token
  const newBody = { userId: request.ctx.users, friendsId: friend };

  try {
    await Friends.create(newBody);
    reply.send({ message: 'success' });
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// A TERMINER
exports.removeFriends = async (request, reply) => {
  const { friend } = request.body;
  // On récupère les informations utilisateur en fonction de sont id décrypté dans le token
  try {
    await Friends.destroy({
      where: { userId: request.ctx.users, friendsId: friend },
    });
    reply.send({ message: 'success' });
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};