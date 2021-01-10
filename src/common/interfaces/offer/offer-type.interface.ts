import { OfferTypeKey } from '~/common/enums';

interface IOfferType {
  [OfferTypeKey.ID]: number;
  [OfferTypeKey.NAME]: string;
  [OfferTypeKey.CREATED_AT]: string;
  [OfferTypeKey.UPDATED_AT]: string;
}

export { IOfferType };
