import { OfferKey, OfferType } from '~/common/enums';
import { IComment } from '~/common/interfaces/comment';

interface IOffer {
  [OfferKey.ID]: string;
  [OfferKey.TITLE]: string;
  [OfferKey.PICTURE]: string;
  [OfferKey.DESCRIPTION]: string;
  [OfferKey.TYPE]: OfferType;
  [OfferKey.SUM]: number;
  [OfferKey.CATEGORIES]: string[];
  [OfferKey.COMMENTS]: IComment[];
}

export { IOffer };
