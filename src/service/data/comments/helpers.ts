import {CommentKey} from '~/common/enums';
import {getItemByKey, getRandomId, removeItemByKey} from '~/helpers';
import {IComment} from '~/common/interfaces';
import {CreatedComment} from '~/common/types';

const getCommentById = (
  comments: IComment[],
  id: IComment[CommentKey.ID]
): IComment | null => {
  const commentById = getItemByKey(comments, CommentKey.ID, id);

  return commentById;
};

const getNewComment = (comment: CreatedComment): IComment => {
  const newComment: IComment = {
    ...comment,
    [CommentKey.ID]: getRandomId(),
  };

  return newComment;
};

const removeComment = (
  comments: IComment[],
  removedComment: IComment
): IComment[] => {
  const updatedComments = removeItemByKey(
    comments,
    CommentKey.ID,
    removedComment.id
  );

  return updatedComments;
};

export {getCommentById, getNewComment, removeComment};
