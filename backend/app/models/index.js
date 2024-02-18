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
    // await sequelize.sync({ force: true }); // Synchronisation de la DB (DROP et CREATE des tables)
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

module.exports = db;