const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// Fonction de connexion à la DB
const connect = async () => {
  try {
    await sequelize.authenticate(); // Testl'authentification
    // await sequelize.sync({ alter: true }); // Synchronisation de la DB (DROP et CREATE des tables)
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

connect();

// Objet retour
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = require('./users.model.js')(sequelize, Sequelize);
db.Communities = require('./communities.model.js')(sequelize, Sequelize);
db.Likes = require('./likes.model.js')(sequelize, Sequelize);
db.Articles = require('./articles.model.js')(sequelize, Sequelize);
db.Comentaries = require('./comentaries.model.js')(sequelize, Sequelize);
db.Friends = require('./friends.model.js')(sequelize, Sequelize);

// Traitement des jointures
db.Articles.belongsTo(db.Users, { foreignKey: 'id_user' });
db.Comentaries.belongsTo(db.Users, { foreignKey: 'id_user' });
db.Comentaries.belongsTo(db.Articles, { foreignKey: 'id_article' });

db.Users.belongsTo(db.Communities, {
  foreignKey: 'id_communities',
  sourceKey: 'id_communities',
  constraints: false,
});
db.Communities.hasMany(db.Users, {
  foreignKey: 'id_user',
  sourceKey: 'id_user',
  constraints: false,
});



// SELF REFERENCE
db.Users.belongsToMany(db.Users, {
  
  as: 'user',
  foreignKey: 'friendsId',
  through: db.Friends,
});
db.Users.belongsToMany(db.Users, {
  as: 'friends',
  foreignKey: 'userId',
  through: db.Friends,
});

module.exports = db;
