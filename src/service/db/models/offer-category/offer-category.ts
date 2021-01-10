import { Sequelize, Model, ModelCtor } from 'sequelize';
import { ModelName, TableName } from '~/common/enums';

class OfferCategory extends Model {}

const define = (sequelize: Sequelize): ModelCtor<OfferCategory> => {
  return sequelize.define(
    ModelName.OFFER_CATEGORY,
    {},
    {
      tableName: TableName.OFFERS_CATEGORIES,
    },
  );
};

export { define };

export default OfferCategory;
