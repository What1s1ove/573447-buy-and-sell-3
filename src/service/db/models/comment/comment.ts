import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { TableName } from '~/common/enums';

class Comment extends Model {}

const define = (sequelize: Sequelize): ModelCtor<Comment> => {
  return sequelize.define(
    Comment.name,
    {
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

export { Comment, define };
