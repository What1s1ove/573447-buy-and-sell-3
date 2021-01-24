import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { ModelName, OfferDtoKey, OfferKey, TableName } from '~/common/enums';

class Offer extends Model {
  [OfferDtoKey.ID]: number;

  [OfferDtoKey.TITLE]: string;

  [OfferDtoKey.OFFER_TYPE_ID]: number;

  [OfferDtoKey.PICTURE]: string;

  [OfferDtoKey.DESCRIPTION]: string;

  [OfferDtoKey.SUM]: number;

  [OfferDtoKey.CATEGORIES]: string[];

  [OfferDtoKey.CREATED_AT]: string;

  [OfferDtoKey.UPDATED_AT]: string;

  addCategories!: Function;

  addOfferTypes!: Function;
}

const define = (sequelize: Sequelize): ModelCtor<Offer> => {
  return sequelize.define(
    ModelName.OFFER,
    {
      [OfferKey.ID]: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      [OfferKey.DESCRIPTION]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [OfferKey.TITLE]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [OfferKey.SUM]: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      [OfferKey.PICTURE]: DataTypes.STRING,
    },
    {
      tableName: TableName.OFFERS,
    },
  );
};

export { define };

export default Offer;
