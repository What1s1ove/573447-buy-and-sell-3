import {CommentKey} from '~/common/enums';

interface IComment {
  [CommentKey.ID]: string;
  [CommentKey.TEXT]: string;
}

export {IComment};
