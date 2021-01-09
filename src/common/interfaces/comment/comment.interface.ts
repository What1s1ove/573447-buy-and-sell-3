import { CommentKey } from '~/common/enums';

interface IComment {
  [CommentKey.ID]: number;
  [CommentKey.TEXT]: string;
  [CommentKey.CREATED_AT]: string;
  [CommentKey.UPDATED_AT]: string;
}

export { IComment };
