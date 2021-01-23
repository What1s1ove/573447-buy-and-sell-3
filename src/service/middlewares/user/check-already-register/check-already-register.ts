import { Users } from '~/service/data';
import { Request, Response, NextFunction } from '~/common/types';
import { CreatedUserValidationMessage, HttpCode } from '~/common/enums';

const checkAlreadyRegister = (service: Users) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const user = await service.findByEmail(req.body.email);
  const hasUser = Boolean(user);

  if (hasUser) {
    return res.status(HttpCode.BAD_REQUEST).send({
      messages: CreatedUserValidationMessage.EMAIL_ALREADY_REGISTER,
    });
  }

  return next();
};

export { checkAlreadyRegister };
