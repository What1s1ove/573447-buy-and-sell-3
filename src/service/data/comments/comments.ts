/* eslint-disable class-methods-use-this */
import { CommentKey } from '~/common/enums';
import { IComment, IOffer } from '~/common/interfaces';
import { CreatedComment } from '~/common/types';
import { getCommentById, getNewComment, removeComment } from './helpers';

class Comments {
  findAll(offer: IOffer): IComment[] {
    return offer.comments;
  }

  public create(offer: IOffer, comment: CreatedComment): IComment {
    const newComment = getNewComment(comment);

    offer.comments.push(newComment);

    return newComment;
  }

  public drop(offer: IOffer, commentId: IComment[CommentKey.ID]): IComment | null {
    const removedComment = getCommentById(offer.comments, commentId);

    if (!removedComment) {
      return null;
    }

    offer.comments = removeComment(offer.comments, removedComment);

    return removedComment;
  }
}

export default Comments;
