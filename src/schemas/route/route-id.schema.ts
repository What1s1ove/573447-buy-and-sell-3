import Joi from 'joi';
import { RouteIdValidationMessage } from '~/common/enums';

const routeId = Joi.number().required().messages({
  'number.base': RouteIdValidationMessage.NUMBER,
});

export { routeId };
