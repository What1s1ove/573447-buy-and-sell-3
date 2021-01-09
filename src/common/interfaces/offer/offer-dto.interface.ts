import { OfferDtoKey } from '~/common/enums';
import { IComment } from '~/common/interfaces/comment';

interface IOfferDto {
  [OfferDtoKey.ID]: number;
  [OfferDtoKey.TITLE]: string;
  [OfferDtoKey.PICTURE]: string;
  [OfferDtoKey.DESCRIPTION]: string;
  [OfferDtoKey.OFFER_TYPE_ID]: number;
  [OfferDtoKey.SUM]: number;
  [OfferDtoKey.CATEGORIES]: string[];
  [OfferDtoKey.COMMENTS]: IComment[];
  [OfferDtoKey.CREATED_AT]: string;
  [OfferDtoKey.UPDATED_AT]: string;
}

export { IOfferDto };
