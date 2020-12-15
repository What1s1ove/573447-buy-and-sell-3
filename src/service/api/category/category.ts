import { Router } from 'express';
import { ApiPath, CategoryApiPath, HttpCode } from '~/common/enums';
import { Category } from '~/service/data';

const initCategoryApi = (app: Router, service: Category): void => {
  const categoryRouter = Router();

  app.use(ApiPath.CATEGORIES, categoryRouter);

  categoryRouter.get(CategoryApiPath.ROOT, (_req, res) => {
    const categories = service.findAll();

    return res.status(HttpCode.OK).json(categories);
  });
};

export { initCategoryApi };
