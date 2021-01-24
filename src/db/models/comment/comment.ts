import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import {
  CommentDtoKey,
  CommentKey,
  ModelName,
  TableName,
} from '~/common/enums';

class Comment extends Model {
  [CommentDtoKey.ID]: number;

  [CommentDtoKey.TEXT]: string;

  [CommentDtoKey.OFFER_ID]: number;

  [CommentDtoKey.CREATED_AT]: string;

  [CommentDtoKey.UPDATED_AT]: string;
}

const define = (sequelize: Sequelize): ModelCtor<Comment> => {
  return sequelize.define(
    ModelName.COMMENT,
    {
      [CommentKey.ID]: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      [CommentKey.TEXT]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: TableName.COMMENTS,
    },
  );
};

export { define };

export default Comment;
