import {OfferKey} from '~/common/enums';

type OfferParams = {
  offerId?: string;
};

const offerRequireKeys = [
  OfferKey.CATEGORY,
  OfferKey.DESCRIPTION,
  OfferKey.PICTURE,
  OfferKey.TITLE,
  OfferKey.TYPE,
  OfferKey.SUM,
];

export {offerRequireKeys, OfferParams};
