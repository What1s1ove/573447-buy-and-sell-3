import { CommentDtoKey } from '~/common/enums';

interface ICommentDto {
  [CommentDtoKey.ID]: number;
  [CommentDtoKey.TEXT]: string;
  [CommentDtoKey.CREATED_AT]: string;
  [CommentDtoKey.UPDATED_AT]: string;
}

export { ICommentDto };
