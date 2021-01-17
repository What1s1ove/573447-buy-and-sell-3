import Joi from 'joi';
import {
  OfferKey,
  OfferValidationMessage,
  OfferValidationRule,
} from '~/common/enums';

const offer = Joi.object({
  [OfferKey.TITLE]: Joi.string()
    .min(OfferValidationRule.TITLE_MIN_LENGTH)
    .max(OfferValidationRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.min': OfferValidationMessage.TITLE_MIN_LENGTH,
      'string.max': OfferValidationMessage.TITLE_MAX_LENGTH,
      'any.required': OfferValidationMessage.TITLE_REQUIRE,
    }),
  [OfferKey.PICTURE]: Joi.string().allow(null).required(),
  [OfferKey.DESCRIPTION]: Joi.string()
    .min(OfferValidationRule.DESCRIPTION_MIN_LENGTH)
    .max(OfferValidationRule.DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.min': OfferValidationMessage.DESCRIPTION_MIN_LENGTH,
      'string.max': OfferValidationMessage.DESCRIPTION_MAX_LENGTH,
      'any.required': OfferValidationMessage.DESCRIPTION_REQUIRE,
    }),
  [OfferKey.OFFER_TYPE_ID]: Joi.number().required(),
  [OfferKey.SUM]: Joi.number()
    .min(OfferValidationRule.SUM_MIN)
    .required()
    .messages({
      'number.min': OfferValidationMessage.SUM_MIN,
      'any.require': OfferValidationMessage.SUM_REQUIRE,
    }),
  [OfferKey.CATEGORIES]: Joi.array().items(Joi.number()).required(),
});

export { offer };
