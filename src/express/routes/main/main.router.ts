/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Router } from 'express';
import { getHttpErrors } from '~/helpers';
import { SsrMainPath, SsrPath, UserKey } from '~/common/enums';
import { OFFERS_PER_PAGE, OFFERS_SKIP_PAGE_COUNT } from '~/common/constants';
import { SsrRouterSettings } from '~/express/common';
import { SessionRequest } from '~/common/types';
import { getLoginData, getRegisterData } from './helpers';

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
      user: (req.session as SessionRequest).user,
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

  mainRouter.get(SsrMainPath.LOGIN, (_req, res) => {
    return res.render(`login`, {
      loginPayload: {},
    });
  });

  mainRouter.post(SsrMainPath.LOGIN, async (req, res) => {
    const loginPayload = getLoginData(req.body);

    try {
      (req.session as SessionRequest).user = await api.loginUser(loginPayload);

      return res.redirect(SsrPath.MAIN);
    } catch (err: unknown) {
      return res.render(`login`, {
        loginPayload,
        errorMessages: getHttpErrors(err),
      });
    }
  });

  mainRouter.get(SsrMainPath.LOGOUT, (req, res) => {
    req.session.destroy(() => {
      res.redirect(SsrMainPath.LOGIN);
    });
  });

  mainRouter.get(SsrMainPath.SEARCH, async (req, res) => {
    const { search } = req.query;
    const resultItems = await api.search(search as string);

    return res.render(`search-result`, {
      resultItems,
      searchValue: search,
      user: (req.session as SessionRequest).user,
    });
  });
};

export { initMainRouter };
