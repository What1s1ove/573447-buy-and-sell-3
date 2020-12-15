import express, { Express } from 'express';
import request, { Response } from 'supertest';
import { Offers, Comments } from '~/service/data';
import { ApiPath, HttpCode, OfferType } from '~/common/enums';
import { initOffersApi } from './offers';
import { mockedOffers } from './offers.mocks';
import { CreatedComment, CreatedOffer } from '~/common/types';
import { IOffer } from '~/common/interfaces';

const createAPI = (): Express => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockedOffers));

  app.use(express.json());

  initOffersApi(app, {
    offers: new Offers({
      offers: cloneData,
    }),
    comments: new Comments(),
  });

  return app;
};

describe(`API returns a list of all offers`, () => {
  const app = createAPI();

  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app).get(ApiPath.OFFERS);
  });

  test(`Status code 200`, () => expect(response?.status).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () => {
    expect(response?.body.length).toBe(5);
  });
});

describe(`API returns an offer with given id`, () => {
  const app = createAPI();

  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app).get(`${ApiPath.OFFERS}/bUAlOA`);
  });

  test(`Status code 200`, () => {
    expect(response?.status).toBe(HttpCode.OK);
  });

  test(`Offer's title is "Куплю антиквариат"`, () => {
    expect(response?.body.title).toBe(`Куплю антиквариат`);
  });
});

describe(`API creates an offer if data is valid`, () => {
  const app = createAPI();
  const newOffer: CreatedOffer = {
    category: [`Котики`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: OfferType.OFFER,
    sum: 100500,
  };

  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app).post(ApiPath.OFFERS).send(newOffer);
  });

  test(`Status code 201`, () => {
    expect(response?.status).toBe(HttpCode.CREATED);
  });

  test(`Returns offer created`, () => {
    expect(response?.body).toEqual(expect.objectContaining(newOffer));
  });

  test(`Offers count is changed`, async () => {
    await request(app)
      .get(ApiPath.OFFERS)
      .expect((res) => expect(res.body.length).toBe(6));
  });
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const app = createAPI();
  const newOffer: CreatedOffer = {
    category: [`Котики`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: OfferType.OFFER,
    sum: 100500,
  };

  test(`Without any required property response code is 400`, async () => {
    const badOffer: Partial<CreatedOffer> = { ...newOffer };

    delete badOffer.title;

    await request(app)
      .post(ApiPath.OFFERS)
      .send(badOffer)
      .expect(HttpCode.BAD_REQUEST);
  });
});

describe(`API changes existent offer`, () => {
  const app = createAPI();
  const newOffer: CreatedOffer = {
    category: [`Котики`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: OfferType.OFFER,
    sum: 100500,
  };

  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app)
      .put(`${ApiPath.OFFERS}/bUAlOA`)
      .send(newOffer);
  });

  test(`Status code 200`, () => {
    expect(response?.status).toBe(HttpCode.OK);
  });

  test(`Returns changed offer`, () => {
    expect(response?.body).toEqual(expect.objectContaining(newOffer));
  });

  test(`Offer is really changed`, async () => {
    await request(app)
      .get(`${ApiPath.OFFERS}/bUAlOA`)
      .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`));
  });
});

test(`API returns status code 404 when trying to change non-existent offer`, async () => {
  const app = createAPI();

  const validOffer: IOffer = {
    id: `id`,
    category: [`Это`],
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: OfferType.OFFER,
    sum: 404,
    comments: [],
  };

  await request(app)
    .put(`${ApiPath.OFFERS}/no_exst`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, async () => {
  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`,
  };

  await request(app)
    .put(`${ApiPath.OFFERS}/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  const app = createAPI();

  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app).delete(`${ApiPath.OFFERS}/ptkZyI`);
  });

  test(`Status code 200`, () => {
    expect(response?.status).toBe(HttpCode.OK);
  });

  test(`Offer count is 4 now`, async () => {
    await request(app)
      .get(ApiPath.OFFERS)
      .expect((res) => expect(res.body.length).toBe(4));
  });
});

test(`API refuses to delete non-existent offer`, async () => {
  const app = createAPI();

  await request(app)
    .delete(`${ApiPath.OFFERS}/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given offer`, () => {
  const app = createAPI();

  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app).get(`${ApiPath.OFFERS}/GxdTgz/comments`);
  });

  test(`Status code 200`, () => expect(response?.status).toBe(HttpCode.OK));

  test(`Returns list of 4 comments`, () => {
    expect(response?.body.length).toBe(4);
  });
});

describe(`API creates a comment if data is valid`, () => {
  const app = createAPI();
  const newComment: CreatedComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };

  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app)
      .post(`${ApiPath.OFFERS}/GxdTgz/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => {
    expect(response?.status).toBe(HttpCode.CREATED);
  });

  test(`Returns comment created`, () => {
    expect(response?.body).toEqual(expect.objectContaining(newComment));
  });

  test(`Comments count is changed`, async () => {
    await request(app)
      .get(`${ApiPath.OFFERS}/GxdTgz/comments`)
      .expect((res) => expect(res.body.length).toBe(5));
  });
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {
  const app = createAPI();
  const newComment: CreatedComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };

  await request(app)
    .post(`${ApiPath.OFFERS}/NOEXST/comments`)
    .send(newComment)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {
  const app = createAPI();

  await request(app)
    .post(`${ApiPath.OFFERS}/GxdTgz/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();

  let response: Response | null = null;

  beforeAll(async () => {
    response = await request(app).delete(
      `${ApiPath.OFFERS}/GxdTgz/comments/kqME9j`,
    );
  });

  test(`Status code 200`, () => {
    expect(response?.status).toBe(HttpCode.OK);
  });

  test(`Comments count is 3 now`, async () => {
    await request(app)
      .get(`${ApiPath.OFFERS}/GxdTgz/comments`)
      .expect((res) => expect(res.body.length).toBe(3));
  });
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = createAPI();

  await request(app)
    .delete(`${ApiPath.OFFERS}/GxdTgz/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent offer`, async () => {
  const app = createAPI();

  await request(app)
    .delete(`${ApiPath.OFFERS}/NOEXST/comments/kqME9j`)
    .expect(HttpCode.NOT_FOUND);
});
