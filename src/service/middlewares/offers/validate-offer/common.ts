import {OfferKey} from '~/common/enums';
import {OfferIdParam} from '~/common/types';

type Params = OfferIdParam;

type OfferRequireKeys = [
  OfferKey.CATEGORY,
  OfferKey.DESCRIPTION,
  OfferKey.PICTURE,
  OfferKey.TITLE,
  OfferKey.TYPE,
  OfferKey.SUM
];

const offerRequireKeys: OfferRequireKeys = [
  OfferKey.CATEGORY,
  OfferKey.DESCRIPTION,
  OfferKey.PICTURE,
  OfferKey.TITLE,
  OfferKey.TYPE,
  OfferKey.SUM,
];

export {Params, offerRequireKeys};
