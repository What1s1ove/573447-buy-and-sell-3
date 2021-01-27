import { Router } from 'express';
import { checkAlreadyRegister, validateSchema } from '~/service/middlewares';
import {
  createdUserPayload as createdUserPayloadSchema,
  userLoginPayload as userLoginPayloadSchema,
} from '~/schemas';
import { Users } from '~/service/data';
import {
  ApiPath,
  HttpCode,
  UserLoginValidationMessage,
  UsersApiPath,
} from '~/common/enums';
import { Request, Response } from '~/common/types';
import { checkIsPasswordSame, mapCreatedUser } from './helpers';

const initUsersApi = (app: Router, service: Users): void => {
  const usersRouter = Router();

  app.use(ApiPath.USERS, usersRouter);

  usersRouter.post(
    UsersApiPath.ROOT,
    [validateSchema(createdUserPayloadSchema), checkAlreadyRegister(service)],
    async (req: Request, res: Response) => {
      const mappedCreatedUser = await mapCreatedUser(req.body);
      const user = await service.create(mappedCreatedUser);

      return res.status(HttpCode.CREATED).json(user);
    },
  );

  usersRouter.post(
    UsersApiPath.LOGIN,
    validateSchema(userLoginPayloadSchema),
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const user = await service.findByEmail(email);

      if (!user) {
        return res.status(HttpCode.UNAUTHORIZE).send({
          messages: [UserLoginValidationMessage.EMAIL_WRONG],
        });
      }

      const isPasswordSame = await checkIsPasswordSame(user, password);

      if (!isPasswordSame) {
        return res.status(HttpCode.UNAUTHORIZE).send({
          messages: [UserLoginValidationMessage.PASSWORD_WRONG],
        });
      }

      return res.status(HttpCode.OK).json(user);
    },
  );
};

export { initUsersApi };
