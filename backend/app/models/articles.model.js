module.exports = (sequelize, Sequelize) => {
  const Articles = sequelize.define('articles', {
    id_articles: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  });

  return Articles;
};
