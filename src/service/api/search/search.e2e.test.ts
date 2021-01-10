import express from 'express';
import { Sequelize } from 'sequelize';
import request, { Response } from 'supertest';
import { initDb } from '~/service/db/init-db';
import { Search } from '~/service/data';
import { ApiPath, HttpCode, OfferType } from '~/common/enums';
import { DbModels } from '~/common/types';
import { initSearchApi } from './search';
import { mockedOffers, mockedCategories } from './search.mocks';

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
  initSearchApi(
    app,
    new Search({
      offerModel: (mockedDB.models as DbModels).Offer,
    }),
  );
});

describe(`API returns offer based on search query`, () => {
  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app).get(ApiPath.SEARCH).query({
      query: `Продам новую приставку`,
    });
  });

  test(`Status code 200`, () => {
    expect(response?.status).toBe(HttpCode.OK);
  });

  test(`1 offer found`, () => {
    expect(response?.body.length).toBe(1);
  });
});

test(`API returns code 200 if nothing is found`, async () => {
  await request(app)
    .get(ApiPath.SEARCH)
    .query({
      query: `Продам свою душу`,
    })
    .expect(HttpCode.OK);
});

test(`API returns 200 when query string is absent`, async () => {
  await request(app).get(ApiPath.SEARCH).expect(HttpCode.OK);
});
