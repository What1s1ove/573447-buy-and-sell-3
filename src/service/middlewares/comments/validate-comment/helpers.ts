import {checkIsValidByKeys} from '~/helpers';
import {CreatedComment} from '~/common/types';
import {commentRequireKeys} from './common';

const checkIsValidComment = (comment: CreatedComment): boolean => {
  const isValidComment = checkIsValidByKeys(comment, commentRequireKeys);

  return isValidComment;
};

export {checkIsValidComment};
