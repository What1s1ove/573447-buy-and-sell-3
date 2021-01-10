import { OfferKey, MockedOfferKey, OfferType } from '~/common/enums';
import { IOffer } from '~/common/interfaces';
import { CreatedComment } from '~/common/types/comment';

type MockedOffer = Omit<
IOffer,
| OfferKey.ID
| OfferKey.COMMENTS
| OfferKey.CREATED_AT
| OfferKey.UPDATED_AT
| OfferKey.OFFER_TYPE
| OfferKey.OFFER_TYPE_ID
> & {
  [OfferKey.COMMENTS]: CreatedComment[];
  [MockedOfferKey.TYPE]: OfferType
};

export { MockedOffer };
