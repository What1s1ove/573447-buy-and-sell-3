import { Router } from 'express';
import { SsrOffersPath, SsrPath } from '~/common/enums';
import { SsrRouterSettings } from '~/express/common';

const initOffersRouter = (app: Router, settings: SsrRouterSettings): void => {
  const offersRouter = Router();
  const { api } = settings;

  app.use(SsrPath.OFFERS, offersRouter);

  offersRouter.get(SsrOffersPath.CATEGORY_$CATEGORY_ID, (_, res) => {
    return res.render(`category`);
  });

  offersRouter.get(SsrOffersPath.ADD, (_, res) => {
    return res.render(`offers/new-ticket`);
  });

  offersRouter.get(SsrOffersPath.EDIT_$OFFER_ID, async (req, res) => {
    const { id } = req.params;

    const [offer, categories] = await Promise.all([
      api.getOffer(id),
      api.getCategories(),
    ]);

    return res.render(`offers/ticket-edit`, {
      offer,
      categories,
    });
  });

  offersRouter.get(SsrOffersPath.$OFFER_ID, (_, res) => {
    return res.render(`offers/ticket`);
  });
};

export { initOffersRouter };
