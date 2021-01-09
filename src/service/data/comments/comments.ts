import { CommentKey } from '~/common/enums';
import { IComment, IOffer } from '~/common/interfaces';
import { CreatedComment, CommentModel } from '~/common/types';

type Constructor = {
  commentModel: CommentModel;
};

class Comments {
  #Comment: CommentModel;

  constructor({ commentModel }: Constructor) {
    this.#Comment = commentModel;
  }

  findAll(offer: IOffer): Promise<IComment[]> {
    return this.#Comment.findAll({
      where: {
        offerId: offer.id,
      },
      raw: true,
    });
  }

  public create(offer: IOffer, comment: CreatedComment): Promise<IComment> {
    return this.#Comment.create({
      offerId: offer.id,
      ...comment,
    });
  }

  public async drop(commentId: IComment[CommentKey.ID]): Promise<boolean> {
    const deletedRows = await this.#Comment.destroy({
      where: {
        id: commentId,
      },
    });

    return !!deletedRows;
  }
}

export default Comments;
