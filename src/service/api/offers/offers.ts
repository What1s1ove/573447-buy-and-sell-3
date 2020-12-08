import {Router} from 'express';
import {Offers} from '~/service/data';
import {ApiPath, HttpCode, OffersApiPath} from '~/common/enums';
import { validateOffer } from '~/service/middlewares';
import { IOffer } from '~/common/interfaces';

const offersRouter = Router();

const initOffersApi = (app: Router, service: Offers): void => {
  app.use(ApiPath.OFFERS, offersRouter);

  offersRouter.get(OffersApiPath.ROOT, (_req, res) => {
    const offers = service.findAll();

    res.status(HttpCode.OK).json(offers);
  });

  offersRouter.post(OffersApiPath.ROOT, validateOffer, (req, res) => {
    const offer = service.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  offersRouter.get(OffersApiPath.OFFER_ID, (req, res) => {
    const {offerId} = req.params;
    const offer = service.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK).json(offer);
  });

  offersRouter.put(OffersApiPath.OFFER_ID, validateOffer, (req, res) => {
    const {offerId} = req.params;
    const existOffer = service.findOne(offerId!);

    if (!existOffer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    const updatedOffer = service.update(req.body as IOffer);

    return res.status(HttpCode.OK)
      .json(updatedOffer);
  });

  offersRouter.delete(OffersApiPath.OFFER_ID, (req, res) => {
    const {offerId} = req.params;
    const offer = service.drop(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(offer);
  });

};

export {initOffersApi};
