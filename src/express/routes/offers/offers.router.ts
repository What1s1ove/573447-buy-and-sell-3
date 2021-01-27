/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Router } from 'express';
import { OfferKey, SsrOffersPath, SsrPath } from '~/common/enums';
import { SessionRequest } from '~/common/types';
import { SsrRouterSettings } from '~/express/common';
import {
  getHttpErrors,
  asyncHandler,
} from '~/helpers';
import { checkUserAuthenticate } from '~/service/middlewares';
import { getOfferData } from './helpers';

const initOffersRouter = (app: Router, settings: SsrRouterSettings): void => {
  const offersRouter = Router();
  const { api, storage } = settings;

  app.use(SsrPath.OFFERS, offersRouter);

  offersRouter.get(SsrOffersPath.CATEGORY_$CATEGORY_ID, (req, res) => {
    return res.render(`category`, {
      user: (req.session as SessionRequest).user,
    });
  });

  offersRouter.get(
    SsrOffersPath.ADD,
    checkUserAuthenticate,
    asyncHandler(async (req, res) => {
      const categories = await api.getCategories();

      return res.render(`offers/ticket-edit`, {
        categories,
        offer: {},
        user: (req.session as SessionRequest).user,
      });
    }),
  );

  offersRouter.post(
    SsrOffersPath.ADD,
    [checkUserAuthenticate, storage.upload.single(OfferKey.PICTURE)],
    asyncHandler(async (req, res) => {
      const { body, file } = req;
      const offerData = getOfferData(body, file?.filename);

      try {
        await api.createOffer(offerData);

        return res.redirect(SsrPath.MY);
      } catch (err: unknown) {
        const categories = await api.getCategories();

        return res.render(`offers/ticket-edit`, {
          categories,
          offer: offerData,
          errorMessages: getHttpErrors(err),
          user: (req.session as SessionRequest).user,
        });
      }
    }),
  );

  offersRouter.get(
    SsrOffersPath.EDIT_$OFFER_ID,
    checkUserAuthenticate,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const [offer, categories] = await Promise.all([
        api.getOffer(Number(id)),
        api.getCategories(),
      ]);

      return res.render(`offers/ticket-edit`, {
        offer,
        categories,
        user: (req.session as SessionRequest).user,
      });
    }),
  );

  offersRouter.post(
    SsrOffersPath.EDIT_$OFFER_ID,
    [checkUserAuthenticate, storage.upload.single(OfferKey.PICTURE)],
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
          categories,
          offer: {
            ...offer,
            ...offerData,
          },
          errorMessages: getHttpErrors(err),
          user: (req.session as SessionRequest).user,
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
        user: (req.session as SessionRequest).user,
      });
    }),
  );

  offersRouter.post(
    SsrOffersPath.$OFFER_ID_COMMENT,
    checkUserAuthenticate,
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
          user: (req.session as SessionRequest).user,
        });
      }
    }),
  );
};

export { initOffersRouter };
