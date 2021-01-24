import { Router } from 'express';
import { Category, Offers, Comments, Search, Users } from '~/service/data';
import sequelize from '~/db/db';
import { defineModels } from '~/db/define-models';
import { DbModels } from '~/common/types';
import { initCategoryApi } from './category/category';
import { initOffersApi } from './offers/offers';
import { initSearchApi } from './search/search';
import { initUsersApi } from './users/users';

const apiRouter = Router();

defineModels(sequelize);

const models = sequelize.models as DbModels;

initUsersApi(
  apiRouter,
  new Users({
    userModel: models.User,
  }),
);

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
