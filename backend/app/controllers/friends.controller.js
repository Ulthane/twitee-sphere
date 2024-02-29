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
    reply
      .code(500)
      .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
  }
};

// Retourne les amis
// exports.getFriendsWithOffset = async (request, reply) => {
//   // On retourne tout les articles avec un offset
//   try {
//     const friends = await Users.findAll({
//       offset: parseInt(request.query.offset),
//       limit: parseInt(request.query.limit),
//       include: [
//         {
//           model: Friends,
//           // attributes: ['firstname', 'lastname', 'img_src', 'community'],
//         },
//       ],
//       attributes:  ['firstname', 'lastname', 'img_src', 'community'],
//     });
//     reply.send(friends);
//   } catch (err) {
//     reply
//       .code(500)
//       .send({ message: "Erreur lors de l'éxécution de la requête : " + err });
//   }
// };