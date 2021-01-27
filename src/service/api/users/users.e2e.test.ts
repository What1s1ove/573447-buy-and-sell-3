import express, { Express } from 'express';
import { Sequelize } from 'sequelize';
import request, { Response } from 'supertest';
import { Users } from '~/service/data';
import { initDb } from '~/db/init-db';
import { CreatedUserPayload, DbModels, UserLoginPayload } from '~/common/types';
import { ApiPath, HttpCode, UserKey, UsersApiPath } from '~/common/enums';
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

describe(`Api works correct when user try to login`, () => {
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

  test(`Allows to login if the user-payload is correct`, async () => {
    const userLoginPayload: UserLoginPayload = {
      email: newUser.email,
      password: newUser.password,
    };

    const userResponse = await request(app)
      .post(`${ApiPath.USERS}/${UsersApiPath.LOGIN}`)
      .send(userLoginPayload);

    expect(userResponse.status).toBe(HttpCode.OK);
    expect(userResponse.body).toHaveProperty(
      UserKey.EMAIL,
      userLoginPayload.email,
    );
  });

  test(`Refuses to login if email is wrong`, async () => {
    const userLoginPayload: UserLoginPayload = {
      email: `wrong@mail.com`,
      password: newUser.password,
    };

    const userResponse = await request(app)
      .post(`${ApiPath.USERS}/${UsersApiPath.LOGIN}`)
      .send(userLoginPayload);

    expect(userResponse.status).toBe(HttpCode.UNAUTHORIZE);
  });

  test(`Refuses to login if password is wrong`, async () => {
    const userLoginPayload: UserLoginPayload = {
      email: newUser.email,
      password: `wrong-password`,
    };

    const userResponse = await request(app)
      .post(`${ApiPath.USERS}/${UsersApiPath.LOGIN}`)
      .send(userLoginPayload);

    expect(userResponse.status).toBe(HttpCode.UNAUTHORIZE);
  });
});
