module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define('likes', {
    id_likes: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_article: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_community: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return Likes;
};
