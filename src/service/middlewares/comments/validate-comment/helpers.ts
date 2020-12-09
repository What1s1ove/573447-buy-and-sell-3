import {CommentKey} from '~/common/enums';
import {CreatedComment} from '~/common/types';
import {commentRequireKeys} from './common';

const checkIsValidComment = (comment: CreatedComment): boolean => {
  const commentKeys = Object.keys(comment) as CommentKey[];
  const isValidComment = commentKeys.every((key) => commentRequireKeys.includes(key));

  return isValidComment;
};

export {checkIsValidComment};
