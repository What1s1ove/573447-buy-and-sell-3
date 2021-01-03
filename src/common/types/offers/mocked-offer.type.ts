import { OfferKey } from '~/common/enums';
import { IOffer } from '~/common/interfaces';

type MockedOffer = Omit<IOffer, OfferKey.ID>;

export { MockedOffer };
