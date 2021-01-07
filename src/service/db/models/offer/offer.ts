import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { OfferKey, TableName } from '~/common/enums';

class Offer extends Model {
  [OfferKey.ID]: number;

  [OfferKey.TITLE]: string;

  [OfferKey.TYPE]: number;

  [OfferKey.PICTURE]: string;

  [OfferKey.DESCRIPTION]: string;

  [OfferKey.SUM]: number;

  [OfferKey.CATEGORIES]: string[];

  [OfferKey.CREATED_AT]: string;

  [OfferKey.UPDATED_AT]: string;

  [OfferKey.COMMENTS]: [];

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
