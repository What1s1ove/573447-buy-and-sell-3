import {Router} from 'express';
import {initCategoryApi} from './category/category';
import {initOffersApi} from './offers/offers';
import {Category, Offers, Comments} from '~/service/data';
import {getMockedDate} from './helpers';

const apiRouter = Router();

(async (): Promise<void> => {
  const mockedData = await getMockedDate();

  initCategoryApi(
    apiRouter,
    new Category({
      offers: mockedData,
    })
  );

  initOffersApi(apiRouter, {
    offers: new Offers({
      offers: mockedData,
    }),
    comments: new Comments(),
  });
})();

export default apiRouter;
