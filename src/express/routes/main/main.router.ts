import { Router } from 'express';
import { SsrMainPath, SsrPath } from '~/common/enums';
import { SsrRouterSettings } from '~/express/common';

const initMainRouter = (app: Router, settings: SsrRouterSettings): void => {
  const mainRouter = Router();
  const { api } = settings;

  app.use(SsrPath.MAIN, mainRouter);

  mainRouter.get(SsrMainPath.ROOT, async (_, res) => {
    const [offers, categories] = await Promise.all([
      api.getOffers(),
      api.getCategories(),
    ]);

    return res.render(`main`, {
      items: offers,
      categories,
    });
  });

  mainRouter.get(SsrMainPath.REGISTER, (_, res) => res.render(`sign-up`));

  mainRouter.get(SsrMainPath.LOGIN, (_, res) => res.render(`login`));

  mainRouter.get(SsrMainPath.SEARCH, async (req, res) => {
    const { search } = req.query;
    const resultItems = await api.search(search as string);

    return res.render(`search-result`, {
      resultItems,
      searchValue: search,
    });
  });
};

export { initMainRouter };
