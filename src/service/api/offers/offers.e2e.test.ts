import express, { Express } from 'express';
import { Sequelize } from 'sequelize';
import request, { Response } from 'supertest';
import { Offers, Comments } from '~/service/data';
import { initDb } from '~/service/db/init-db';
import { ApiPath, HttpCode, OfferType } from '~/common/enums';
import { CreatedComment, CreatedOffer, DbModels } from '~/common/types';
import { IOffer } from '~/common/interfaces';
import { initOffersApi } from './offers';
import { mockedOffers, mockedCategories } from './offers.mocks';

const createAPI = async (): Promise<Express> => {
  const app = express();
  const mockedDB = new Sequelize(`sqlite::memory:`, {
    logging: false,
  });

  app.use(express.json());

  await initDb(mockedDB, {
    categories: mockedCategories,
    offerTypes: Object.values(OfferType),
    offers: mockedOffers,
  });

  initOffersApi(app, {
    offers: new Offers({
      offerModel: (mockedDB.models as DbModels).Offer,
    }),
    comments: new Comments({
      commentModel: (mockedDB.models as DbModels).Comment,
    }),
  });

  return app;
};

describe(`API returns a list of all offers`, () => {
  let app: Express | null = null;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(ApiPath.OFFERS);
  });

  test(`Status code 200`, () => expect(response?.status).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () => {
    expect(response?.body.length).toBe(5);
  });
});

describe(`API returns an offer with given id`, () => {
  let app: Express | null = null;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`${ApiPath.OFFERS}/1`);
  });

  test(`Status code 200`, () => {
    expect(response?.status).toBe(HttpCode.OK);
  });

  test(`Offer's title is "Куплю антиквариат"`, () => {
    expect(response?.body.title).toBe(`Куплю антиквариат`);
  });
});

describe(`API creates an offer if data is valid`, () => {
  const newOffer: CreatedOffer = {
    categories: [1],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф. Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    offerTypeId: 1,
    sum: 100500,
  };
  let app: Express | null = null;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(ApiPath.OFFERS).send(newOffer);
  });

  test(`Status code 201`, () => {
    expect(response?.status).toBe(HttpCode.CREATED);
  });

  test(`Offers count is changed`, async () => {
    await request(app)
      .get(ApiPath.OFFERS)
      .expect((res) => expect(res.body.length).toBe(6));
  });
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const newOffer: CreatedOffer = {
    categories: [],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    offerTypeId: 1,
    sum: 100500,
  };
  let app: Express | null = null;

  beforeAll(async () => {
    app = await createAPI();
  });

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
  const newOffer: CreatedOffer = {
    categories: [],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф. Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    offerTypeId: 1,
    sum: 100500,
  };

  let app: Express;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`${ApiPath.OFFERS}/2`)
      .send(newOffer);
  });

  test(`Status code 200`, () => {
    expect(response?.status).toBe(HttpCode.OK);
  });

  test(`Offer is really changed`, async () => {
    await request(app)
      .get(`${ApiPath.OFFERS}/2`)
      .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`));
  });
});

test(`API returns status code 404 when trying to change non-existent offer`, async () => {
  const app = await createAPI();

  const validOffer: CreatedOffer = {
    categories: [],
    title: `Валидный заголовок`,
    description: `Валидное-валидное-валидное-валидное-валидное описание`,
    picture: `Валидная картинка`,
    offerTypeId: 1,
    sum: 404,
  };

  await request(app)
    .put(`${ApiPath.OFFERS}/20`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, async () => {
  const app = await createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`,
  };

  await request(app)
    .put(`${ApiPath.OFFERS}/20`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  let app: Express | null;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`${ApiPath.OFFERS}/1`);
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
  const app = await createAPI();

  await request(app)
    .delete(`${ApiPath.OFFERS}/20`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given offer`, () => {
  let app: Express | null = null;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`${ApiPath.OFFERS}/2/comments`);
  });

  test(`Status code 200`, () => expect(response?.status).toBe(HttpCode.OK));

  test(`Returns list of 4 comments`, () => {
    expect(response?.body.length).toBe(3);
  });
});

describe(`API creates a comment if data is valid`, () => {
  const newComment: CreatedComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };
  let app: Express | null = null;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`${ApiPath.OFFERS}/3/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => {
    expect(response?.status).toBe(HttpCode.CREATED);
  });

  test(`Returns comment created`, () => {
    expect(response?.body).toEqual(expect.objectContaining(newComment));
  });
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {
  const app = await createAPI();
  const newComment: CreatedComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };

  await request(app)
    .post(`${ApiPath.OFFERS}/20/comments`)
    .send(newComment)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {
  const app = await createAPI();

  await request(app)
    .post(`${ApiPath.OFFERS}/2/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  let app: Express | null = null;
  let response: Response | null = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(
      `${ApiPath.OFFERS}/1/comments/1`,
    );
  });

  test(`Status code 200`, () => {
    expect(response?.status).toBe(HttpCode.OK);
  });

  test(`Comments count is 3 now`, async () => {
    await request(app)
      .get(`${ApiPath.OFFERS}/1/comments`)
      .expect((res) => expect(res.body.length).toBe(3));
  });
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = await createAPI();

  await request(app)
    .delete(`${ApiPath.OFFERS}/4/comments/100`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent offer`, async () => {
  const app = await createAPI();

  await request(app)
    .delete(`${ApiPath.OFFERS}/20/comments/100`)
    .expect(HttpCode.NOT_FOUND);
});
