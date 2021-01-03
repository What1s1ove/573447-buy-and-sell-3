import { Sequelize, Model, ModelCtor } from 'sequelize';
import { TableName } from '~/common/enums';

class OfferCategory extends Model {}

const define = (sequelize: Sequelize): ModelCtor<OfferCategory> => {
  return sequelize.define(
    OfferCategory.name,
    {},
    {
      tableName: TableName.OFFERS_CATEGORIES,
    },
  );
};

export { OfferCategory, define };
