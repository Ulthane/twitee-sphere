const jwt = require('jsonwebtoken');

module.exports.jwtVerify = (request, reply, done) => {
  if (request.headers.authorization !== '') {
    // On découpé la chaine de caractère pour ne récuperer que le token
    const bearer = request.headers.authorization.split(' ');
    const bearerToken = bearer[1];

    // On vérifie le token, si inexistant alors 401. sinon on envoie l'id user dans le contexte suivant
    jwt.verify(bearerToken, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        reply
          .code(401)
          .send({ message: "Le token n'existe pas sur le serveur" });
      } else {
        request.ctx = data.users;
        done();
      }
    });
  } else {
    reply.code(401).send({ message: "Le token n'existe pas sur le serveur" });
  }
};
