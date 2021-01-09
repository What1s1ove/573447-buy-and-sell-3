import { OfferTypeDtoKey } from '~/common/enums';

interface IOfferTypeDto {
  [OfferTypeDtoKey.ID]: number;
  [OfferTypeDtoKey.NAME]: string;
  [OfferTypeDtoKey.CREATED_AT]: string;
  [OfferTypeDtoKey.UPDATED_AT]: string;
}

export { IOfferTypeDto };
