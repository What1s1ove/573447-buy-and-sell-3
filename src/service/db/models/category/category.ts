import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { TableName } from '~/common/enums';

class Category extends Model {
  id!: number;

  name!: string;
}

const define = (sequelize: Sequelize): ModelCtor<Category> => {
  return sequelize.define(
    Category.name,
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
      tableName: TableName.CATEGORIES,
    },
  );
};

export { Category, define };
