import { OfferKey } from '~/common/enums';
import { IOffer } from '~/common/interfaces';

type CreatedOffer = Omit<
IOffer,
| OfferKey.ID
| OfferKey.COMMENTS
| OfferKey.CREATED_AT
| OfferKey.UPDATED_AT
| OfferKey.OFFER_TYPE
>;

export { CreatedOffer };
