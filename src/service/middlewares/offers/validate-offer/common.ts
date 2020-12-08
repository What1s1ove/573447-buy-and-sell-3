import {OfferKey} from '~/common/enums';

type OfferParams = {
  offerId?: string;
};

const offerRequireKeys = [
  OfferKey.CATEGORY,
  OfferKey.DESCRIPTION,
  OfferKey.PICTURE,
  OfferKey.TITLE,
  OfferKey.TITLE,
  OfferKey.SUM,
];

export {offerRequireKeys, OfferParams};
