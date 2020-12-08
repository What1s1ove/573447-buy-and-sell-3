import {Router} from 'express';
import {initCategoryApi} from './category/category';
import {initOffersApi} from './offers/offers';
import {Category} from '~/service/data';
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

  initOffersApi(apiRouter);
})();

export default apiRouter;
