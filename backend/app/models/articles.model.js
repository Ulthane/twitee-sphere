module.exports = (sequelize, Sequelize) => {
  const Articles = sequelize.define('articles', {
    id_articles: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });

  return Articles;
};
