import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import {
  TableName,
  ModelName,
  SessionDtoKey,
  SessionKey,
  SessionValidationRule,
} from '~/common/enums';

class Session extends Model {
  [SessionDtoKey.SID]: string;

  [SessionDtoKey.EXPIRES]: string;

  [SessionDtoKey.DATA]: string;

  [SessionDtoKey.CREATED_AT]: string;

  [SessionDtoKey.UPDATED_AT]: string;
}

const define = (sequelize: Sequelize): ModelCtor<Session> => {
  return sequelize.define(
    ModelName.SESSION,
    {
      [SessionKey.SID]: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      [SessionKey.EXPIRES]: {
        type: DataTypes.DATE,
      },
      [SessionKey.DATA]: {
        type: new DataTypes.STRING(SessionValidationRule.DATA_LENGTH),
      },
    },
    {
      tableName: TableName.SESSIONS,
    },
  );
};

export { define };

export default Session;
