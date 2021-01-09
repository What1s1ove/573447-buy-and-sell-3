import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { CategoryDtoKey, TableName } from '~/common/enums';

class Category extends Model {
  [CategoryDtoKey.ID]: number;

  [CategoryDtoKey.NAME]: string;

  [CategoryDtoKey.CREATED_AT]: string;

  [CategoryDtoKey.UPDATED_AT]: string;
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
