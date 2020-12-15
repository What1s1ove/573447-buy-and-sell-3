import { getUniqueItems } from '~/helpers';
import { IOffer } from '~/common/interfaces';
import { getCategories } from './helpers';

type Constructor = {
  offers: IOffer[];
};

class Category {
  #offers: IOffer[];

  constructor({ offers }: Constructor) {
    this.#offers = offers;
  }

  public findAll(): string[] {
    const categories = getUniqueItems(getCategories(this.#offers));

    return categories;
  }
}

export default Category;
