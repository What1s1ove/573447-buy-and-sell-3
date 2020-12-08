import {OfferKey} from '~/common/enums';
import {CreatedOffer} from '~/common/types';
import {offerRequireKeys} from './common';

const checkIsValidOffer = (offer: CreatedOffer): boolean => {
  const offerKeys = Object.keys(offer) as OfferKey[];
  const isValidOffer = offerKeys.every((key) => offerRequireKeys.includes(key));

  return isValidOffer;
};

export {checkIsValidOffer};
