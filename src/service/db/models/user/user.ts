import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { TableName, OfferTypeDtoKey, ModelName } from '~/common/enums';

class User extends Model {
  [OfferTypeDtoKey.ID]: number;

  [OfferTypeDtoKey.NAME]: string;

  [OfferTypeDtoKey.CREATED_AT]: string;

  [OfferTypeDtoKey.UPDATED_AT]: string;
}

const define = (sequelize: Sequelize): ModelCtor<User> => {
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
      tableName: TableName.USERS,
    },
  );
};

export { define };

export default User;
