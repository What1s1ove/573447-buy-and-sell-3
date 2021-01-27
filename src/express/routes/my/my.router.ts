import { Router } from 'express';
import { SsrMyPath, SsrPath } from '~/common/enums';
import { SessionRequest } from '~/common/types';
import { SsrRouterSettings } from '~/express/common';
import { checkUserAuthenticate } from '~/service/middlewares';

const initMyRouter = (app: Router, settings: SsrRouterSettings): void => {
  const myRouter = Router();
  const { api } = settings;

  app.use(SsrPath.MY, myRouter);

  myRouter.get(SsrMyPath.ROOT, checkUserAuthenticate, async (req, res) => {
    const items = await api.getOffers();

    return res.render(`my-tickets`, {
      items,
      user: (req.session as SessionRequest).user,
    });
  });

  myRouter.get(SsrMyPath.COMMENTS, checkUserAuthenticate, async (req, res) => {
    const items = await api.getOffers();

    return res.render(`comments`, {
      items,
      user: (req.session as SessionRequest).user,
    });
  });
};

export { initMyRouter };
