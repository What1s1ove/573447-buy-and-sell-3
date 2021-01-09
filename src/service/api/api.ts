import { Router } from 'express';
import { Category, Offers, Comments, Search } from '~/service/data';
import sequelize from '~/service/db/db';
import { defineModels } from '~/service/db/define-models';
import { DbModels } from '~/common/types';
import { initCategoryApi } from './category/category';
import { initOffersApi } from './offers/offers';
import { initSearchApi } from './search/search';

const apiRouter = Router();

defineModels(sequelize);

const models = sequelize.models as DbModels;

initCategoryApi(
  apiRouter,
  new Category({
    categoryModel: models.Category,
  }),
);

initOffersApi(apiRouter, {
  offers: new Offers({
    offerModel: models.Offer,
  }),
  comments: new Comments({
    commentModel: models.Comment,
  }),
});

initSearchApi(
  apiRouter,
  new Search({
    offerModel: models.Offer,
  }),
);

export default apiRouter;
