import Joi from 'joi';
import {
  CommentKey,
  CommentValidationMessage,
  CommentValidationRule,
} from '~/common/enums';
import { CreatedComment } from '~/common/types';

const comment = Joi.object<CreatedComment>({
  [CommentKey.TEXT]: Joi.string()
    .min(CommentValidationRule.TEXT_MIN_LENGTH)
    .required()
    .messages({
      'any.require': CommentValidationMessage.TEXT_MIN_LENGTH,
    }),
});

export { comment };
