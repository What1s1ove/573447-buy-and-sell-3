import {IOffer} from '~/common/interfaces';

const getOfferById = (offers: IOffer[], id: string) => {
  const offerById = offers.find((offer) => offer.id === id);

  return offerById ?? null;
};

export {getOfferById};
