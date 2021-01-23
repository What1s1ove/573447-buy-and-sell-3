/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Router } from 'express';
import { SsrOffersPath, SsrPath } from '~/common/enums';
import { SsrRouterSettings } from '~/express/common';
import {
  getHttpErrors,
  asyncHandler,
} from '~/helpers';
import { getOfferData } from './helpers';

const initOffersRouter = (app: Router, settings: SsrRouterSettings): void => {
  const offersRouter = Router();
  const { api, storage } = settings;

  app.use(SsrPath.OFFERS, offersRouter);

  offersRouter.get(SsrOffersPath.CATEGORY_$CATEGORY_ID, (_, res) => {
    return res.render(`category`);
  });

  offersRouter.get(
    SsrOffersPath.ADD,
    asyncHandler(async (_, res) => {
      const categories = await api.getCategories();

      return res.render(`offers/ticket-edit`, {
        offer: {},
        categories,
      });
    }),
  );

  offersRouter.post(
    SsrOffersPath.ADD,
    storage.upload.single(`avatar`),
    asyncHandler(async (req, res) => {
      const { body, file } = req;
      const offerData = getOfferData(body, file?.filename);

      try {
        await api.createOffer(offerData);

        return res.redirect(SsrPath.MY);
      } catch (err: unknown) {
        const categories = await api.getCategories();

        return res.render(`offers/ticket-edit`, {
          offer: offerData,
          categories,
          errorMessages: getHttpErrors(err),
        });
      }
    }),
  );

  offersRouter.get(
    SsrOffersPath.EDIT_$OFFER_ID,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const [offer, categories] = await Promise.all([
        api.getOffer(Number(id)),
        api.getCategories(),
      ]);

      return res.render(`offers/ticket-edit`, {
        offer,
        categories,
      });
    }),
  );

  offersRouter.post(
    SsrOffersPath.EDIT_$OFFER_ID,
    storage.upload.single(`avatar`),
    asyncHandler(async (req, res) => {
      const { body, file, params } = req;
      const parsedId = Number(params.id);
      const offerData = getOfferData(body, file?.filename);

      try {
        await api.updateOffer(parsedId, offerData);

        return res.redirect(SsrPath.MY);
      } catch (err: unknown) {
        const offer = await api.getOffer(parsedId);
        const categories = await api.getCategories();

        return res.render(`offers/ticket-edit`, {
          offer: {
            ...offer,
            ...offerData,
          },
          categories,
          errorMessages: getHttpErrors(err),
        });
      }
    }),
  );

  offersRouter.get(
    SsrOffersPath.$OFFER_ID,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const offer = await api.getOffer(Number(id));

      return res.render(`offers/ticket`, {
        item: offer,
      });
    }),
  );

  offersRouter.post(
    SsrOffersPath.$OFFER_ID_COMMENT,
    asyncHandler(async (req, res) => {
      const { body, params } = req;
      const parsedComment = Number(params.id);

      try {
        await api.createComment(parsedComment, {
          text: body.comment,
        });

        return res.redirect(`${SsrPath.OFFERS}/${parsedComment}`);
      } catch (err: unknown) {
        const offer = await api.getOffer(parsedComment);

        return res.render(`offers/ticket`, {
          item: offer,
          errorMessages: getHttpErrors(err),
        });
      }
    }),
  );
};

export { initOffersRouter };
