import { OfferKey } from '~/common/enums';
import { IOffer } from '~/common/interfaces';

type CreatedOffer = Omit<IOffer, OfferKey.ID | OfferKey.COMMENTS>;

export { CreatedOffer };
