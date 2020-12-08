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

  findAll() {
    return this.#offers;
  }

  findOne(id: string) {
    const offerById = getOfferById(this.#offers, id);

    return offerById;
  }

  create(offer: CreatedOffer) {
    const newOffer = getNewOffer(offer);

    this.#offers.push(newOffer);

    return newOffer;
  }

  update(offer: IOffer) {
    this.#offers = updateOffer(this.#offers, offer);

    return offer;
  }

  drop(offer: IOffer) {
    this.#offers = removeOffer(this.#offers, offer);

    return null;
  }
}

export default Offers;
