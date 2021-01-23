import { Router } from 'express';
import { checkAlreadyRegister, validateSchema } from '~/service/middlewares';
import { createdUserPayload as createdUserPayloadSchema } from '~/schemas';
import { Users } from '~/service/data';
import { ApiPath, HttpCode, UsersApiPath } from '~/common/enums';
import { Request, Response } from '~/common/types';
import { mapCreatedUser } from './helpers';

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
};

export { initUsersApi };
