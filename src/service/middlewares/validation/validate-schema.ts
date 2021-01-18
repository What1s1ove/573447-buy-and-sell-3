import { ObjectSchema, ValidationError } from 'joi';
import { HttpCode } from '~/common/enums';
import { Request, Response, NextFunction } from '~/common/types';

const validateSchema = <T extends ObjectSchema, Req>(schema: T) => async (
  req: Request<Req>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { body } = req;

  try {
    await schema.validateAsync(body, {
      abortEarly: false,
      convert: false,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      const { details } = err;

      return res.status(HttpCode.BAD_REQUEST).send({
        messages: details.map((error) => error.message),
      });
    }
  }

  return next();
};

export { validateSchema };
