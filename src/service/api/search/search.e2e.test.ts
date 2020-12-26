import express from 'express';
import request, { Response } from 'supertest';
import { Search } from '~/service/data';
import { ApiPath, HttpCode } from '~/common/enums';
import { initSearchApi } from './search';
import { mockedOffers } from './search.mocks';

const app = express();

app.use(express.json());

initSearchApi(
  app,
  new Search({
    offers: mockedOffers,
  }),
);

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
