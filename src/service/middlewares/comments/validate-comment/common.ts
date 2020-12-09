import {CommentKey} from '~/common/enums';
import {OfferIdParam} from '~/common/types';

type Params = OfferIdParam;

type CommentRequireKeys = [CommentKey.TEXT];

const commentRequireKeys: CommentRequireKeys = [CommentKey.TEXT];

export {Params, commentRequireKeys};
