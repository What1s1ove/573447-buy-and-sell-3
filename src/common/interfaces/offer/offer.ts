import {OfferType} from '~/common/enums';

interface IOffer {
  id: string;
  title: string;
  picture: string;
  description: string;
  type: OfferType;
  sum: number;
  category: string[];
}

export {IOffer};
