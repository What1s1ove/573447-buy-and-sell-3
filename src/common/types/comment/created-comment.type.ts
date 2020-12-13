import { CommentKey } from '~/common/enums';
import { IComment } from '~/common/interfaces';

type CreatedComment = Omit<IComment, CommentKey.ID>;

export { CreatedComment };
