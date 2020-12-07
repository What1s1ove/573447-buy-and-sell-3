import {Router} from 'express';
import {initCategoryApi} from './category/category';
import {Category} from '~/service/data';
import {getMockedDate} from './helpers';

const app = Router();

(async () => {
  const mockedData = await getMockedDate();

  initCategoryApi(
    app,
    new Category({
      offers: mockedData,
    })
  );
})();

export default app;
