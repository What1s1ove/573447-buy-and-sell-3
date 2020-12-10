import {Router} from 'express';
import {ApiPath, CategoryApiPath, HttpCode} from '~/common/enums';
import {Category} from '~/service/data';

const categoryRouter = Router();

const initCategoryApi = (app: Router, service: Category): void => {
  app.use(ApiPath.CATEGORY, categoryRouter);

  categoryRouter.get(CategoryApiPath.ROOT, async (_req, res) => {
    const categories = await service.findAll();

    return res.status(HttpCode.OK).json(categories);
  });
};

export {initCategoryApi};
