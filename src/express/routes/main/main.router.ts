/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Router } from 'express';
import { SsrMainPath, SsrPath, UserKey } from '~/common/enums';
import { OFFERS_PER_PAGE, OFFERS_SKIP_PAGE_COUNT } from '~/common/constants';
import { SsrRouterSettings } from '~/express/common';
import { getRegisterData } from './helpers';
import { getHttpErrors } from '~/helpers';

const initMainRouter = (app: Router, settings: SsrRouterSettings): void => {
  const mainRouter = Router();
  const { api, storage } = settings;

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

  mainRouter.get(SsrMainPath.REGISTER, (_req, res) => {
    return res.render(`sign-up`, {
      registerPayload: {},
    });
  });

  mainRouter.post(
    SsrMainPath.REGISTER,
    storage.upload.single(UserKey.AVATAR),
    async (req, res) => {
      const { body, file } = req;
      const registerPayload = getRegisterData(body, file?.filename);

      try {
        await api.registerUser(registerPayload);

        return res.redirect(SsrMainPath.LOGIN);
      } catch (err: unknown) {
        return res.render(`sign-up`, {
          registerPayload,
          errorMessages: getHttpErrors(err),
        });
      }
    },
  );

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
