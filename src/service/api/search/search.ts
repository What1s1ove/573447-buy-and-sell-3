import { Router } from 'express';
import { ApiPath, HttpCode, SearchApiPath } from '~/common/enums';
import { Search } from '~/service/data';

const searchRouter = Router();

const initSearchApi = (app: Router, service: Search): void => {
  app.use(ApiPath.SEARCH, searchRouter);

  searchRouter.get(SearchApiPath.ROOT, (req, res) => {
    const { query = `` } = req.query;

    if (!query) {
      return res.status(HttpCode.BAD_REQUEST).json([]);
    }

    const offers = service.findAll(query as string);

    return res.status(HttpCode.OK).json(offers);
  });
};

export { initSearchApi };
