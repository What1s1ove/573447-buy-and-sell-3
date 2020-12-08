import {getRandomId} from '~/helpers';
import {OfferKey} from '~/common/enums';
import {IOffer} from '~/common/interfaces';
import {CreatedOffer} from '~/common/types';

const getOfferById = (offers: IOffer[], id: string) => {
  const offerById = offers.find((offer) => offer.id === id);

  return offerById ?? null;
};

const getNewOffer = (offer: CreatedOffer) => {
  const newOffer: IOffer = {
    ...offer,
    [OfferKey.ID]: getRandomId(),
    [OfferKey.COMMENTS]: [],
  };

  return newOffer;
};

const updateOffer = (offers: IOffer[], updatedOffer: IOffer) => {
  const updatedOffers = offers.map((offer) => (
    offer.id === updatedOffer.id ? updatedOffer : offer
  ));

  return updatedOffers;
};

export {getOfferById, getNewOffer, updateOffer};
