exports.addScore = async (db, user, type) => {
  const communities = await db.Users.findOne({
    where: {
      id_user: user,
    },
    attributes: ['id_communities'],
  });

  if (communities.dataValues.id_communities) {
    let score = await db.Communities.findOne({
      where: {
        id_communities: communities.id_communities,
      },
      attributes: ['score'],
    });

    switch (type) {
      case 'commentary':
        score.dataValues.score += 5;
        break;
      case 'article':
        score.dataValues.score += 10;
        break;
      case 'like':
        score.dataValues.score += 2;
        break;
      default:
        break;
    }

    await db.Communities.update(
      { score: score.dataValues.score },
      {
        where: {
          id_communities: communities.id_communities,
        },
      }
    );
  }
};

exports.removeScore = async (db, user, type) => {
  const communities = await db.Users.findOne({
    where: {
      id_user: user,
    },
    attributes: ['id_communities'],
  });

  if (communities.dataValues.id_communities) {
    let score = await db.Communities.findOne({
      where: {
        id_communities: communities.id_communities,
      },
      attributes: ['score'],
    });

    switch (type) {
      case 'commentary':
        score.dataValues.score -= 5;
        break;
      case 'article':
        score.dataValues.score -= 10;
        break;
      case 'like':
        score.dataValues.score -= 2;
        break;
      default:
        break;
    }

    await db.Communities.update(
      { score: score.dataValues.score },
      {
        where: {
          id_communities: communities.id_communities,
        },
      }
    );
  }
};
