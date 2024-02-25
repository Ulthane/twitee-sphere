module.exports = (sequelize, Sequelize) => {
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
      defaultValue: '/assets/default.png'
    },
    community: {
      type: Sequelize.STRING,
    },
  });

  return Users;
};
