import express from 'express';
import { Sequelize } from 'sequelize';
import request, { Response } from 'supertest';
import { Category } from '~/service/data';
import { initDb } from '~/service/db/init-db';
import { DbModels } from '~/common/types';
import { ApiPath, HttpCode, OfferType } from '~/common/enums';
import { initCategoryApi } from './category';
import { mockedCategories, mockedOffers } from './category.mocks';
import { ICategory } from '~/common/interfaces';

const app = express();
const mockedDB = new Sequelize(`sqlite::memory:`, {
  logging: false,
});

app.use(express.json());

beforeAll(async () => {
  await initDb(mockedDB, {
    categories: mockedCategories,
    offerTypes: Object.values(OfferType),
    offers: mockedOffers,
  });

  initCategoryApi(
    app,
    new Category({
      categoryModel: (mockedDB.models as DbModels).Category,
    }),
  );
});

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

  test(`Category names are "Животные", "Журналы", "Игры"`, () => {
    expect(response?.body.map((it: ICategory) => it.name)).toEqual([
      `Животные`,
      `Журналы`,
      `Игры`,
    ]);
  });
});
