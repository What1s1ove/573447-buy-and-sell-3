import { Sequelize, DataTypes, Model } from 'sequelize';

class OfferType extends Model {}

const define = (sequelize: Sequelize): Model => {
  return OfferType.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: `OfferType`,
      tableName: `offer_types`,
    },
  );
};

export { define };
