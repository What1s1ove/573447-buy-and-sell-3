import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { TableName, UserDtoKey, ModelName, UserKey } from '~/common/enums';

class User extends Model {
  [UserDtoKey.ID]: number;

  [UserDtoKey.EMAIL]: string;

  [UserDtoKey.PASSWORD]: string;

  [UserDtoKey.FIRST_NAME]: string;

  [UserDtoKey.LAST_NAME]: string;

  [UserDtoKey.CREATED_AT]: string;

  [UserDtoKey.UPDATED_AT]: string;
}

const define = (sequelize: Sequelize): ModelCtor<User> => {
  return sequelize.define(
    ModelName.OFFER_TYPE,
    {
      [UserKey.ID]: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      [UserKey.EMAIL]: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      [UserKey.PASSWORD]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [UserKey.FIRST_NAME]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [UserKey.LAST_NAME]: {
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
