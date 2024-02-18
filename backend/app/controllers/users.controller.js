const db = require('../models');
const Users = db.Users;
const { Op } = require('sequelize');

// Retourne tout les objets disponible dans la BDD
exports.getAllUsers = async (request, reply) => {
  try {
    const users = await Users.findAll();
    reply.send(users);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

exports.login = async (request, reply) => {
  const user = request.body.email;
  const password = request.body.password;

  try {
    const users = await Users.findOne({
      where: { [Op.and]: [{ email: user }, { password: password }] },
    });
    reply.send(users);
  } catch (err) {
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }

  reply.send({ message: 'success' });
};
