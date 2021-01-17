import { ObjectSchema, ValidationError } from 'joi';
import { HttpCode } from '~/common/enums';
import { Request, Response, NextFunction } from '~/common/types';

const validateSchema = <T extends ObjectSchema>(schema: T) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { body } = req;

  try {
    await schema.validateAsync(body, { abortEarly: false });
  } catch (err) {
    if (err instanceof ValidationError) {
      const { details } = err;

      return res.status(HttpCode.BAD_REQUEST).send({
        message: details.map((error) => error.message),
      });
    }
  }

  return next();
};

export { validateSchema };
