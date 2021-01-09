import { OfferKey } from '~/common/enums';
import { IComment } from '~/common/interfaces/comment';

interface IOffer {
  [OfferKey.ID]: number;
  [OfferKey.TITLE]: string;
  [OfferKey.PICTURE]: string;
  [OfferKey.DESCRIPTION]: string;
  [OfferKey.TYPE]: number;
  [OfferKey.SUM]: number;
  [OfferKey.CATEGORIES]: string[];
  [OfferKey.COMMENTS]: IComment[];
  [OfferKey.CREATED_AT]: string;
  [OfferKey.UPDATED_AT]: string;
}

export { IOffer };
