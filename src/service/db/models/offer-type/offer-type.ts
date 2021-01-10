import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { TableName, OfferTypeDtoKey, ModelName } from '~/common/enums';

class OfferType extends Model {
  [OfferTypeDtoKey.ID]: number;

  [OfferTypeDtoKey.NAME]: string;

  [OfferTypeDtoKey.CREATED_AT]: string;

  [OfferTypeDtoKey.UPDATED_AT]: string;
}

const define = (sequelize: Sequelize): ModelCtor<OfferType> => {
  return sequelize.define(
    ModelName.OFFER_TYPE,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
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

export default OfferType;
