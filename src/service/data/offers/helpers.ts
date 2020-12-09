import {getItemByKey, getRandomId, removeItemByKey} from '~/helpers';
import {CommentKey, OfferKey} from '~/common/enums';
import {IOffer} from '~/common/interfaces';
import {CreatedOffer} from '~/common/types';

const getOfferById = (
  offers: IOffer[],
  id: IOffer[CommentKey.ID]
): IOffer | null => {
  const offerById = getItemByKey(offers, OfferKey.ID, id);

  return offerById;
};

const getNewOffer = (offer: CreatedOffer): IOffer => {
  const newOffer: IOffer = {
    ...offer,
    [OfferKey.ID]: getRandomId(),
    [OfferKey.COMMENTS]: [],
  };

  return newOffer;
};

const updateOffer = (offers: IOffer[], updatedOffer: IOffer): IOffer[] => {
  const updatedOffers = offers.map((offer) =>
    offer.id === updatedOffer.id ? updatedOffer : offer
  );

  return updatedOffers;
};

const removeOffer = (offers: IOffer[], removedOffer: IOffer): IOffer[] => {
  const updatedOffers = removeItemByKey(offers, OfferKey.ID, removedOffer.id);

  return updatedOffers;
};

export {getOfferById, getNewOffer, updateOffer, removeOffer};
