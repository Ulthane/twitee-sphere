const db = require('../models');
const Users = db.Users;
const { createSecretToken } = require('../utils/secretToken');
const bcrypt = require('bcrypt');

// Retourne tout les objets disponible dans la BDD
exports.getAllUsers = async (request, reply) => {
  // On retourne tout les utilisateurs
  try {
    const users = await Users.findAll();
    reply.send(users);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne tout les objets disponible dans la BDD
exports.getUsersById = async (request, reply) => {
  // On récupère les informations utilisateur en fonction de sont id décrypté dans le token
  try {
    const users = await Users.findOne({
      where: {
        id_user: request.ctx,
      },
    });
    reply.send(users);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne tout les objets disponible dans la BDD
exports.signIn = async (request, reply) => {
  /* 
  EN premier on récupère l'utilisateur en base,
  Puis on test sont mot de passe en le comparant a celui envoyer
  */
  try {
    const user = await Users.findOne({
      where: { email: request.body.email },
    });

    const match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const token = createSecretToken({ users: user.id_user });
      reply.send({ accesToken: `Bearer ${token}` });
    } else {
      reply.code(401).send({ message: 'Identifiant invalide' });
    }
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }

  reply.send({ message: 'success' });
};

// Controlleur pour l'enregistrement utilisateur
exports.signUp = async (request, reply) => {
  try {
    // Création du mot de passe encrypté
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const newBody = { ...request.body };
    newBody.password = hashedPassword;

    // On insère l'utilisateur en base, et puis on génère sont token avec sont id.
    // l'id eprmettra de récuperer les données de l'utilisateur après déstructuration
    const users = await Users.create({ ...newBody });
    const token = createSecretToken({ users: users.id_user });
    reply.send({ accessToken: `Bearer ${token}` });
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};
