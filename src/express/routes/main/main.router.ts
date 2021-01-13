import { Router } from 'express';
import { SsrMainPath, SsrPath } from '~/common/enums';
import { OFFERS_PER_PAGE, OFFERS_SKIP_PAGE_COUNT } from '~/common/constants';
import { SsrRouterSettings } from '~/express/common';

const initMainRouter = (app: Router, settings: SsrRouterSettings): void => {
  const mainRouter = Router();
  const { api } = settings;

  app.use(SsrPath.MAIN, mainRouter);

  mainRouter.get(SsrMainPath.ROOT, async (req, res) => {
    const { page = 1 } = req.query;
    const parsedPage = Number(page);
    const offset = (parsedPage - OFFERS_SKIP_PAGE_COUNT) * OFFERS_PER_PAGE;

    const [{ count, offers }, categories] = await Promise.all([
      api.getPageOffers({
        limit: OFFERS_PER_PAGE,
        offset,
      }),
      api.getCategories(),
    ]);

    const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

    return res.render(`main`, {
      categories,
      totalPages,
      items: offers,
      page: parsedPage,
    });
  });

  mainRouter.get(SsrMainPath.REGISTER, (_req, res) => res.render(`sign-up`));

  mainRouter.get(SsrMainPath.LOGIN, (_req, res) => res.render(`login`));

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
