import { Sequelize, DataTypes, Model } from 'sequelize';

class Comment extends Model {}

const define = (sequelize: Sequelize): Model => {
  return Comment.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: `Comment`,
      tableName: `comments`,
    },
  );
};

export { define };
