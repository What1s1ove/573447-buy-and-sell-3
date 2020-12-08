import {getUniqueItems} from '~/helpers';
import {OfferType} from '~/common/enums';
import {IOffer} from '~/common/interfaces';
import {getCategories} from './helpers';

type Constructor = {
  offers: IOffer[];
};

class Category {
  #offers: IOffer[];

  constructor({offers}: Constructor) {
    this.#offers = offers;
  }

  findAll(): OfferType[] {
    const categories = getUniqueItems(getCategories(this.#offers));

    return categories;
  }
}

export default Category;
