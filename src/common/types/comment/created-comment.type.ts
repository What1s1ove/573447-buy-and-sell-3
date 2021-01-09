import { CommentKey } from '~/common/enums';
import { IComment } from '~/common/interfaces';

type CreatedComment = Omit<IComment, CommentKey.ID | CommentKey.CREATED_AT | CommentKey.UPDATED_AT>;

export { CreatedComment };
