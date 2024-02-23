module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define('likes', {
    id_likes: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    article: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    community: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return Likes;
};
