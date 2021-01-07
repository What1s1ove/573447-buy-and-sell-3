import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { CategoryKey, TableName } from '~/common/enums';

class Category extends Model {
  [CategoryKey.ID]: number;

  [CategoryKey.NAME]!: string;

  [CategoryKey.CREATED_AT]: string;

  [CategoryKey.UPDATED_AT]: string;
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

export { define };

export default Category;
