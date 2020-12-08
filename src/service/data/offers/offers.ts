import {IOffer} from '~/common/interfaces';
import {CreatedOffer} from '~/common/types';
import {getOfferById, getNewOffer, updateOffer, removeOffer} from './helpers';

type Constructor = {
  offers: IOffer[];
};

class Offers {
  #offers: IOffer[];

  constructor({offers}: Constructor) {
    this.#offers = offers;
  }

  findAll(): IOffer[] {
    return this.#offers;
  }

  findOne(id: string): IOffer | null {
    const offerById = getOfferById(this.#offers, id);

    return offerById;
  }

  create(offer: CreatedOffer): IOffer {
    const newOffer = getNewOffer(offer);

    this.#offers.push(newOffer);

    return newOffer;
  }

  update(offer: IOffer): IOffer {
    this.#offers = updateOffer(this.#offers, offer);

    return offer;
  }

  drop(offer: IOffer): null {
    this.#offers = removeOffer(this.#offers, offer);

    return null;
  }
}

export default Offers;
