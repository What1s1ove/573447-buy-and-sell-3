import { Sequelize, DataTypes, Model } from 'sequelize';

class Category extends Model {}

const define = (sequelize: Sequelize): Model => {
  return Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: `Category`,
      tableName: `categories`,
    },
  );
};

export { define };
