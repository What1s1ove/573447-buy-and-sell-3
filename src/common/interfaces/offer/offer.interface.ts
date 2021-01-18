import { OfferKey } from '~/common/enums';
import { IComment } from '~/common/interfaces/comment';
import { IOfferType } from '~/common/interfaces/offer/offer-type.interface';

interface IOffer {
  [OfferKey.ID]: number;
  [OfferKey.TITLE]: string;
  [OfferKey.PICTURE]: string | null;
  [OfferKey.DESCRIPTION]: string;
  [OfferKey.OFFER_TYPE_ID]: number;
  [OfferKey.SUM]: number;
  [OfferKey.CATEGORIES]: number[];
  [OfferKey.COMMENTS]: IComment[];
  [OfferKey.OFFER_TYPE]: IOfferType;
  [OfferKey.CREATED_AT]: string;
  [OfferKey.UPDATED_AT]: string;
}

export { IOffer };
