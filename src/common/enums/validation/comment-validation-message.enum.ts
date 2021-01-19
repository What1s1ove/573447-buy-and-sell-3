import { CommentValidationRule } from '~/common/enums/validation/comment-validation-rule.enum';

const CommentValidationMessage = {
  TEXT_REQUIRE: `Коментарий обязательное поле`,
  TEXT_MIN_LENGTH: `Коментарий должен быть минимум ${CommentValidationRule.TEXT_MIN_LENGTH} символов`,
} as const;

export { CommentValidationMessage };
