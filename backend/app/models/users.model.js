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
      defaultValue: 'https://cdn.pixabay.com/photo/2017/06/30/10/14/social-media-2457842_1280.png',
    },
    id_communities: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });

  return Users;
};
