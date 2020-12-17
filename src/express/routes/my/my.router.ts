import { Router } from 'express';
import { SsrMyPath, SsrPath } from '~/common/enums';
import { SsrRouterSettings } from '~/express/common';

const initMyRouter = (app: Router, settings: SsrRouterSettings): void => {
  const myRouter = Router();
  const { api } = settings;

  app.use(SsrPath.MY, myRouter);

  myRouter.get(
    SsrMyPath.ROOT,
    async (_, res): Promise<void> => {
      const items = await api.getOffers();

      return res.render(`my-tickets`, {
        items,
      });
    },
  );

  myRouter.get(
    SsrMyPath.COMMENTS,
    async (_, res): Promise<void> => {
      const items = await api.getOffers();

      return res.render(`comments`, {
        items,
      });
    },
  );
};

export { initMyRouter };
