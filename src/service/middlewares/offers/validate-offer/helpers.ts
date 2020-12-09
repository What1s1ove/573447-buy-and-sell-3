import {CreatedOffer} from '~/common/types';
import {checkIsValidateByKeys} from '~/helpers';
import {offerRequireKeys} from './common';

const checkIsValidOffer = (offer: CreatedOffer): boolean => {
  const isValidOffer = checkIsValidateByKeys(offer, offerRequireKeys);

  return isValidOffer;
};

export {checkIsValidOffer};
