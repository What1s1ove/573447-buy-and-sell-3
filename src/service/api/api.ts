import {Router} from 'express';
import {initCategoryApi} from './category/category';
import {Category} from '~/service/data';
import {getMockedDate} from './helpers';

const apiRouter = Router();

(async () => {
  const mockedData = await getMockedDate();

  initCategoryApi(
    apiRouter,
    new Category({
      offers: mockedData,
    })
  );
})();

export default apiRouter;
