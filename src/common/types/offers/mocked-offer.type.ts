import { OfferKey } from '~/common/enums';
import { IOffer } from '~/common/interfaces';
import { CreatedComment } from '~/common/types/comment';

type MockedOffer = Omit<IOffer, OfferKey.ID | OfferKey.COMMENTS> & {
  [OfferKey.COMMENTS]: CreatedComment[];
};

export { MockedOffer };
