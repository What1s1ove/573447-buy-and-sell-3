import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { TableName } from '~/common/enums';

class Offer extends Model {
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

export { Offer, define };
