/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import path from 'path';
import { Router } from 'express';
import multer from 'multer';
import { SsrOffersPath, SsrPath } from '~/common/enums';
import { SsrRouterSettings } from '~/express/common';
import {
  getFileExtension,
  getHttpErrors,
  getRandomId,
  asyncHandler,
} from '~/helpers';
import { getOfferData } from './helpers';

const UPLOAD_DIR = `../../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (_, file, cb) => {
    const uniqueName = getRandomId();
    const extension = getFileExtension(file.originalname);

    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({ storage });

const initOffersRouter = (app: Router, settings: SsrRouterSettings): void => {
  const offersRouter = Router();
  const { api } = settings;

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
    upload.single(`avatar`),
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
    upload.single(`avatar`),
    asyncHandler(async (req, res) => {
      const { body, file, params } = req;
      const offerData = getOfferData(body, file?.filename);

      try {
        await api.updateOffer(Number(params.id), offerData);

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
      const { id } = params;

      try {
        await api.createComment(Number(id), {
          text: body.comment,
        });

        return res.redirect(`${SsrPath.OFFERS}/${id}`);
      } catch (err: unknown) {
        const offer = await api.getOffer(Number(id));

        return res.render(`offers/ticket`, {
          item: offer,
          errorMessages: getHttpErrors(err),
        });
      }
    }),
  );
};

export { initOffersRouter };
