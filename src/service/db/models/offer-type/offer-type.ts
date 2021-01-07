import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { TableName } from '~/common/enums';

class OfferType extends Model {
  id!: number;

  name!: string;
}

const define = (sequelize: Sequelize): ModelCtor<OfferType> => {
  return sequelize.define(
    OfferType.name,
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
