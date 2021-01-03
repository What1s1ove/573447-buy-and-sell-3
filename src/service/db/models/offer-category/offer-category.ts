import { Sequelize, Model } from 'sequelize';

class OfferCategory extends Model {}

const define = (sequelize: Sequelize): Model => {
  return OfferCategory.init(
    {},
    {
      sequelize,
      modelName: `OfferCategory`,
      tableName: `offers_categories`,
    },
  );
};

export { define };
