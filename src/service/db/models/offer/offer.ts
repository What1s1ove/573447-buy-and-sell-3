import { Sequelize, DataTypes, Model } from 'sequelize';

class Offer extends Model {}

const define = (sequelize: Sequelize): Model => {
  return Offer.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: DataTypes.STRING,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: `Offer`,
      tableName: `offers`,
    },
  );
};

export { define };
