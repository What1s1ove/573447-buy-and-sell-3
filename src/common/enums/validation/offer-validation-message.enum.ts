import { OfferValidationRule } from '~/common/enums/validation/offer-validation-rule.enum';

const OfferValidationMessage = {
  TITLE_MIN_LENGTH: `Заголовок должен быть не меньше ${OfferValidationRule.TITLE_MIN_LENGTH} символов`,
  TITLE_MAX_LENGTH: `Заголовок должен быть не больше ${OfferValidationRule.TITLE_MAX_LENGTH} символов`,
  TITLE_REQUIRE: `Заголовок обязательное поле`,
  DESCRIPTION_MIN_LENGTH: `Описание должно быть не меньше ${OfferValidationRule.DESCRIPTION_MIN_LENGTH} символов`,
  DESCRIPTION_MAX_LENGTH: `Описание должно быть не больше ${OfferValidationRule.DESCRIPTION_MAX_LENGTH} символов`,
  DESCRIPTION_REQUIRE: `Описание обязательное поле`,
  SUM_MIN: `Сумма должна быть не меньше ${OfferValidationRule.SUM_MIN}`,
  SUM_REQUIRE: `Сумма обязательное поле`,
} as const;

export { OfferValidationMessage };
