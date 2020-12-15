import { OfferKey } from '~/common/enums';
import { IOffer } from '~/common/interfaces';
import { CreatedOffer } from '~/common/types';
import { getOfferById, getNewOffer, updateOffer, removeOffer } from './helpers';

type Constructor = {
  offers: IOffer[];
};

class Offers {
  #offers: IOffer[];

  constructor({ offers }: Constructor) {
    this.#offers = offers;
  }

  public findAll(): IOffer[] {
    return this.#offers;
  }

  public findOne(id: IOffer[OfferKey.ID]): IOffer | null {
    const offerById = getOfferById(this.#offers, id);

    return offerById;
  }

  public create(offer: CreatedOffer): IOffer {
    const newOffer = getNewOffer(offer);

    this.#offers.push(newOffer);

    return newOffer;
  }

  public update(offer: IOffer, offerId: IOffer[OfferKey.ID]): IOffer {
    this.#offers = updateOffer(this.#offers, offerId, offer);

    return offer;
  }

  public drop(id: IOffer[OfferKey.ID]): IOffer | null {
    const deletedOffer = getOfferById(this.#offers, id);

    if (!deletedOffer) {
      return null;
    }

    this.#offers = removeOffer(this.#offers, deletedOffer);

    return deletedOffer;
  }
}

export default Offers;
