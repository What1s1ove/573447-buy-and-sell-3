import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { OfferDtoKey, TableName } from '~/common/enums';

class Offer extends Model {
  [OfferDtoKey.ID]: number;

  [OfferDtoKey.TITLE]: string;

  [OfferDtoKey.TYPE]: number;

  [OfferDtoKey.PICTURE]: string;

  [OfferDtoKey.DESCRIPTION]: string;

  [OfferDtoKey.SUM]: number;

  [OfferDtoKey.CATEGORIES]: string[];

  [OfferDtoKey.CREATED_AT]: string;

  [OfferDtoKey.UPDATED_AT]: string;

  [OfferDtoKey.COMMENTS]: [];

  addCategories!: Function;

  addOfferTypes!: Function;
}

const define = (sequelize: Sequelize): ModelCtor<Offer> => {
  return sequelize.define(
    Offer.name,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
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
      tableName: TableName.OFFERS,
    },
  );
};

export { define };

export default Offer;
