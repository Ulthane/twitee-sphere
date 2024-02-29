module.exports = (sequelize, Sequelize) => {
  const Friends = sequelize.define('friends_relations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  });

  return Friends;
};
