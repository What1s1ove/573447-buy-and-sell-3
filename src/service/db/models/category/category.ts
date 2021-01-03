import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { TableName } from '~/common/enums';

class Category extends Model {}

const define = (sequelize: Sequelize): ModelCtor<Category> => {
  return sequelize.define(
    Category.name,
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: TableName.CATEGORIES,
    },
  );
};

export { define };
