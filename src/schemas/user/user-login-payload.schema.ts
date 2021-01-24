import Joi from 'joi';
import {
  UserLoginPayloadKey,
  UserLoginValidationMessage,
} from '~/common/enums';

const userLoginPayload = Joi.object({
  [UserLoginPayloadKey.EMAIL]: Joi.string().email().required().messages({
    'any.required': UserLoginValidationMessage.EMAIL_REQUIRE,
    'string.email': UserLoginValidationMessage.EMAIL_WRONG,
  }),
  [UserLoginPayloadKey.PASSWORD]: Joi.string().required().messages({
    'any.required': UserLoginValidationMessage.PASSWORD_REQUIRE,
  }),
});

export { userLoginPayload };
