module.exports = (sequelize, Sequelize) => {
  const Communities = sequelize.define('communities', {
    id_communities: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    icon: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return Communities;
};
