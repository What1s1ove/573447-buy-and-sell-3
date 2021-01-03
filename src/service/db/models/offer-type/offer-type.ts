import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { TableName } from '~/common/enums';

class OfferType extends Model {}

const define = (sequelize: Sequelize): ModelCtor<OfferType> => {
  return sequelize.define(
    OfferType.name,
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: TableName.OFFER_TYPES,
    },
  );
};

export { define };
