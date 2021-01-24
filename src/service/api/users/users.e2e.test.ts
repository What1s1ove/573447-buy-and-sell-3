import express, { Express } from 'express';
import { Sequelize } from 'sequelize';
import request, { Response } from 'supertest';
import { Users } from '~/service/data';
import { initDb } from '~/db/init-db';
import { CreatedUserPayload, DbModels } from '~/common/types';
import { ApiPath, HttpCode } from '~/common/enums';
import { initUsersApi } from './users';

const createAPI = async (): Promise<Express> => {
  const app = express();
  const mockedDB = new Sequelize(`sqlite::memory:`, {
    logging: false,
  });

  app.use(express.json());

  await initDb(mockedDB, {
    categories: [],
    offerTypes: [],
    offers: [],
  });

  initUsersApi(
    app,
    new Users({
      userModel: (mockedDB.models as DbModels).User,
    }),
  );

  return app;
};

describe(`Api create a user if data is valid`, () => {
  const newUser: CreatedUserPayload = {
    email: `test@mail.com`,
    password: `password`,
    repeatedPassword: `password`,
    firstName: `firstName`,
    lastName: `lastName`,
    avatar: `avatar.jpg`,
  };

  let app: Express | null = null;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(ApiPath.USERS).send(newUser);
  });

  test(`Status code 201`, () => {
    expect(response?.status).toBe(HttpCode.CREATED);
  });

  test(`Status code 400 when try to register user with the same email`, async () => {
    await request(app)
      .post(ApiPath.USERS)
      .send(newUser)
      .expect(HttpCode.BAD_REQUEST);
  });
});

describe(`API refuses to create a user if data is invalid`, () => {
  const invalidUser = {
    email: `invalid.com`,
    firstName: `firstName`,
    lastName: `lastName`,
  };

  let app: Express | null = null;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(ApiPath.USERS).send(invalidUser);
  });

  test(`Status code 400`, () => {
    expect(response?.status).toBe(HttpCode.BAD_REQUEST);
  });
});
