import {OfferType} from '~/common/enums';

interface IOffer {
  title: string;
  picture: string;
  description: string;
  type: OfferType;
  sum: number;
  category: string[];
}

export {IOffer};
