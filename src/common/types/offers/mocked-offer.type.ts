import { OfferKey } from '~/common/enums';
import { IOffer } from '~/common/interfaces';
import { CreatedComment } from '~/common/types/comment';

type MockedOffer = Omit<IOffer, OfferKey.ID | OfferKey.COMMENTS | OfferKey.CREATED_AT | OfferKey.UPDATED_AT> & {
  [OfferKey.COMMENTS]: CreatedComment[];
};

export { MockedOffer };
