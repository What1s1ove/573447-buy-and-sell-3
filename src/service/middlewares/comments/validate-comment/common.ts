import {CommentKey} from '~/common/enums';
import {OfferIdParam} from '~/common/types';

type Params = OfferIdParam;

const commentRequireKeys = [CommentKey.TEXT];

export {Params, commentRequireKeys};
