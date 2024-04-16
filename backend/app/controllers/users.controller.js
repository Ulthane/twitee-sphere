const db = require('../models');
const Users = db.Users;
const Communities = db.Communities;
const bcrypt = require('bcrypt');
const { createSecretToken } = require('../utils/secretToken');
const { Op } = require('sequelize');

// Retourne tout les objets disponible dans la BDD
exports.getAllUsers = async (request, reply) => {
  // On retourne tout les utilisateurs
  try {
    const users = await Users.findAll({
      attributes: ['firstname', 'lastname', 'surname', 'email', 'img_src', 'id_communities'],
      include: [
        {
          model: Communities,
        },
      ],
    });
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne tout les objets disponible dans la BDD
exports.getUsersById = async (request, reply) => {
  // On récupère les informations utilisateur en fonction de sont id décrypté dans le token
  try {
    const users = await Users.findOne({
      attributes: ['id_user', 'firstname', 'lastname', 'surname', 'email', 'img_src', 'id_communities'],
      include: [
        {
          model: Users,
          as: 'friends',
          attributes: ['id_user', 'firstname', 'lastname', 'surname', 'img_src'],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        id_user: request.ctx.users,
      },
    });
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne tout les objets disponible dans la BDD
exports.getFriendById = async (request, reply) => {
  // On récupère les informations utilisateur en fonction de sont id décrypté dans le token
  try {
    const users = await Users.findOne({
      attributes: ['firstname', 'lastname', 'surname', 'img_src', 'id_communities'],
      include: [
        {
          model: Users,
          as: 'friends',
          attributes: ['id_user', 'firstname', 'lastname', 'surname', 'img_src'],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        id_user: request.params.id,
      },
    });
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne les utilisateurs par leur nom (regex)
exports.getUsersByName = async (request, reply) => {
  const pattern = `%${request.params.username}%`;

  try {
    const users = await Users.findAll({
      attributes: ['id_user', 'firstname', 'lastname', 'surname', 'email', 'img_src', 'id_communities'],
      where: {
        surname: {
          [Op.like]: pattern,
        },
      },
    });
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Permet de modifier l'utilisateur
exports.modifyUser = async (request, reply) => {
  try {
    await Users.update(request.body, {
      where: {
        id_user: request.ctx.users,
      },
    });
    reply.code(200).send({ message: 'Modification effectuée avec succès' });
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
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
      reply.code(401).send({ message: 'Mot de passe invalide' });
    }
  } catch (err) {
    reply.code(404).send({ message: "L'utilisateur n'existe pas !" });
  }
};

// Controlleur pour l'enregistrement utilisateur
exports.signUp = async (request, reply) => {
  try {
    // Création du mot de passe encrypté
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const newBody = { ...request.body };
    newBody.password = hashedPassword;

    // Ici on vérifie que l'utilisateur n'existe pas avec sont email
    const userExist = await Users.findOne({
      where: { email: request.body.email },
    });
    if (userExist) {
      return reply.code(403).send({ message: "L'utilisateur existe déjà" });
    }

    // On recherche si le surnom existe déjà, si oui on récupère le total et on incrémente de 1
    const surname = new Promise(async (resolve, reject) => {
      // On créer le surnom de base
      const createSurname = '@' + request.body.firstname.substring(0, 1) + request.body.lastname;

      // Appel a la BDD pour trouver si le surnom existe
      Users.findOne({
        attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('*')), 'total']],
        where: {
          surname: {
            [Op.like]: `${createSurname}%`,
          },
        },
      }).then((result) => {
        // On créer le surnom de l'utilisateur
        if (result.dataValues.total != 0) {
          resolve(createSurname.toLowerCase() + parseInt(result.dataValues.total + 1));
        } else {
          resolve(createSurname.toLowerCase());
        }
      });
    });

    // On insère l'utilisateur en base, et puis on génère sont token avec sont id.
    // l'id eprmettra de récuperer les données de l'utilisateur après déstructuration
    const surnameResult = await surname;
    newBody.surname = surnameResult;

    const users = await Users.create({ ...newBody });
    const token = createSecretToken({ users: users.id_user });

    return reply.send({ accessToken: `Bearer ${token}` });
  } catch (err) {
    reply.code(500).send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};
