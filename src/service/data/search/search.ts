import { IOffer } from '~/common/interfaces';
import { getOffersByTitleValue } from './helpers';

type Constructor = {
  offers: IOffer[];
};

class Search {
  #offers: IOffer[];

  constructor({ offers }: Constructor) {
    this.#offers = offers;
  }

  findAll(titleValue: string): IOffer[] {
    const offersByTitleValue = getOffersByTitleValue(this.#offers, titleValue);

    return offersByTitleValue;
  }
}

export default Search;
