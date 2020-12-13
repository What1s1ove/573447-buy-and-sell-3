import express from 'express';
import request, { Response } from 'supertest';
import { Category } from '~/service/data';
import { ApiPath, HttpCode } from '~/common/enums';
import { initCategoryApi } from './category';
import { mockedOffers } from './category.mocks';

const app = express();

app.use(express.json());

initCategoryApi(
  app,
  new Category({
    offers: mockedOffers,
  }),
);

describe(`API returns category list`, () => {
  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app).get(ApiPath.CATEGORIES);
  });

  test(`Status code 200`, () => {
    expect(response?.status).toBe(HttpCode.OK);
  });

  test(`Returns list of 3 categories`, () => {
    expect(response?.body.length).toBe(3);
  });

  test(`Category names are "Журналы", "Игры", "Животные"`, () => {
    expect(response?.body).toEqual([`Журналы`, `Игры`, `Животные`]);
  });
});
