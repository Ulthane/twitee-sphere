module.exports = (sequelize, Sequelize, Communities) => {
  const Users = sequelize.define('users', {
    id_user: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img_src: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '/assets/default.png',
    },
    id_communities: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  });

  return Users;
};
