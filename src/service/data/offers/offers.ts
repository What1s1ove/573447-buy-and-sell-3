import { OfferKey, TableName } from '~/common/enums';
import { IOffer } from '~/common/interfaces';
import { CreatedOffer, OfferModel } from '~/common/types';

type Constructor = {
  offerModel: OfferModel;
};

class Offers {
  #Offer: OfferModel;

  constructor({ offerModel }: Constructor) {
    this.#Offer = offerModel;
  }

  public async findAll(): Promise<IOffer[]> {
    const offers = await this.#Offer.findAll({
      include: [
        TableName.CATEGORIES,
        TableName.COMMENTS,
        TableName.OFFER_TYPES,
      ],
    });

    return offers.map((item) => item.get());
  }

  public findOne(id: IOffer[OfferKey.ID]): Promise<IOffer | null> {
    return this.#Offer.findByPk(id, {
      include: [
        TableName.CATEGORIES,
        TableName.COMMENTS,
        TableName.OFFER_TYPES,
      ],
    }) as Promise<IOffer | null>;
  }

  public async create(createdOffer: CreatedOffer): Promise<boolean> {
    const offer = await this.#Offer.create(createdOffer);

    await offer.addCategories(createdOffer.categories);

    return offer.get();
  }

  public async update(
    offer: IOffer,
    offerId: IOffer[OfferKey.ID],
  ): Promise<boolean> {
    const [affectedRows] = await this.#Offer.update(offer, {
      where: {
        id: offerId,
      },
    });

    return Boolean(affectedRows);
  }

  public async drop(offerId: IOffer[OfferKey.ID]): Promise<boolean> {
    const deletedRows = await this.#Offer.destroy({
      where: {
        id: offerId,
      },
    });

    return Boolean(deletedRows);
  }
}

export default Offers;
