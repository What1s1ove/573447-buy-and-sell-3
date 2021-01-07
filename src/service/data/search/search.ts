import { TableName, DbOperator } from '~/common/enums';
import { IOffer } from '~/common/interfaces';
import { OfferModel } from '~/common/types';

type Constructor = {
  offerModel: OfferModel;
};

class Search {
  #Offer: OfferModel;

  constructor({ offerModel }: Constructor) {
    this.#Offer = offerModel;
  }

  public async findAll(titleValue: string): Promise<IOffer[]> {
    const offers = await this.#Offer.findAll({
      where: {
        title: {
          [DbOperator.substring]: titleValue,
        },
      },
      include: [TableName.CATEGORIES],
    });

    return offers.map((offer) => offer.get());
  }
}

export default Search;
