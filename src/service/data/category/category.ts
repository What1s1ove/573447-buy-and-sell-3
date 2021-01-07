import { ICategory } from '~/common/interfaces';
import { CategoryModel } from '~/common/types';

type Constructor = {
  categoryModel: CategoryModel;
};

class Category {
  #Category: CategoryModel;

  constructor({ categoryModel }: Constructor) {
    this.#Category = categoryModel;
  }

  public findAll(): Promise<ICategory[]> {
    return this.#Category.findAll({
      raw: true,
    });
  }
}

export default Category;
