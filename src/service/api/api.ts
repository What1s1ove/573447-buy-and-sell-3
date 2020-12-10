import {Router} from 'express';
import {initCategoryApi} from './category/category';
import {initOffersApi} from './offers/offers';
import {initSearchApi} from './search/search';
import {Category, Offers, Comments, Search} from '~/service/data';
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

  initSearchApi(
    apiRouter,
    new Search({
      offers: mockedData,
    })
  );
})();

export default apiRouter;
