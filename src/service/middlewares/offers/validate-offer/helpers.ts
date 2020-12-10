import {CreatedOffer} from '~/common/types';
import {checkIsValidByKeys} from '~/helpers';
import {offerRequireKeys} from './common';

const checkIsValidOffer = (offer: CreatedOffer): boolean => {
  const isValidOffer = checkIsValidByKeys(offer, offerRequireKeys);

  return isValidOffer;
};

export {checkIsValidOffer};
