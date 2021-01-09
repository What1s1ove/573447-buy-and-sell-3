import { Router } from 'express';
import { ApiPath, HttpCode, SearchApiPath } from '~/common/enums';
import { Search } from '~/service/data';

const initSearchApi = (app: Router, service: Search): void => {
  const searchRouter = Router();

  app.use(ApiPath.SEARCH, searchRouter);

  searchRouter.get(SearchApiPath.ROOT, async (req, res) => {
    const { query = `` } = req.query;

    if (!query) {
      return res.status(HttpCode.OK).json([]);
    }

    const offers = await service.findAll(query as string);

    return res.status(HttpCode.OK).json(offers);
  });
};

export { initSearchApi };
