import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { CommentDtoKey, TableName } from '~/common/enums';

class Comment extends Model {
  [CommentDtoKey.ID]: number;

  [CommentDtoKey.TEXT]: string;

  [CommentDtoKey.CREATED_AT]: string;

  [CommentDtoKey.UPDATED_AT]: string;
}

const define = (sequelize: Sequelize): ModelCtor<Comment> => {
  return sequelize.define(
    Comment.name,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      text: {
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
