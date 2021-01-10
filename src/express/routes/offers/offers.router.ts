import path from 'path';
import { Router } from 'express';
import multer from 'multer';
import { SsrOffersPath, SsrPath } from '~/common/enums';
import { SsrRouterSettings } from '~/express/common';
import { getFileExtension, getRandomId } from '~/helpers';
import { CreatedOffer } from '~/common/types';

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

  offersRouter.get(SsrOffersPath.ADD, async (_, res) => {
    const categories = await api.getCategories();

    return res.render(`offers/new-ticket`, {
      categories,
    });
  });

  offersRouter.post(SsrOffersPath.ADD, upload.single(`avatar`), async (req, res) => {
    try {
      const { body, file } = req;
      const offerData: CreatedOffer = {
        picture: file.filename,
        sum: body.price,
        offerTypeId: body.action,
        description: body.comment,
        title: body.title,
        categories: body.category,
      };

      await api.createOffer(offerData);

      return res.redirect(SsrPath.MY);
    } catch {
      return res.redirect(`back`);
    }
  });

  offersRouter.get(SsrOffersPath.EDIT_$OFFER_ID, async (req, res) => {
    const { id } = req.params;
    const [offer, categories] = await Promise.all([
      api.getOffer(Number(id)),
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
