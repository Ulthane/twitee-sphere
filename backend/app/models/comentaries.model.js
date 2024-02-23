module.exports = (sequelize, Sequelize) => {
  const Comentaries = sequelize.define('comentaries', {
    id_comentaries: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    article: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });

  return Comentaries;
};
