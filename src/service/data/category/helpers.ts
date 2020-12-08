import {OfferType} from '~/common/enums';
import {IOffer} from '~/common/interfaces';

const getCategories = (offers: IOffer[]): OfferType[] => {
  const categories = offers.map((offer) => offer.type);

  return categories;
};

export {getCategories};
