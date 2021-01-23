import { AnySchema, ValidationError } from 'joi';
import { HttpCode, RequestParam } from '~/common/enums';
import { Request, Response, NextFunction } from '~/common/types';

const validateParamSchema = <T extends AnySchema, Req>(
  schema: T,
  param: RequestParam,
) => async (
    req: Request<Req>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const currentParam = req.params[param];

    try {
      await schema.validateAsync(currentParam, {
        abortEarly: false,
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

export { validateParamSchema };
