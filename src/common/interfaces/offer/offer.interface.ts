import {OfferType} from '~/common/enums';
import {IComment} from '~/common/interfaces/comment';

interface IOffer {
  id: string;
  title: string;
  picture: string;
  description: string;
  type: OfferType;
  sum: number;
  category: string[];
  comments: IComment[];
}

export {IOffer};
