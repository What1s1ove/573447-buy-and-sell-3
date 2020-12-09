import {Router} from 'express';
import {ApiPath, HttpCode, OffersApiPath} from '~/common/enums';
import {validateOffer} from '~/service/middlewares';
import {IOffer} from '~/common/interfaces';
import {OffersApiServices} from './common';

const offersRouter = Router();

const initOffersApi = (app: Router, services: OffersApiServices): void => {
  const {offers: offersService, comments: commentsService} = services;

  app.use(ApiPath.OFFERS, offersRouter);

  offersRouter.get(OffersApiPath.ROOT, (_req, res) => {
    const offers = offersService.findAll();

    res.status(HttpCode.OK).json(offers);
  });

  offersRouter.post(OffersApiPath.ROOT, validateOffer, (req, res) => {
    const offer = offersService.create(req.body);

    return res.status(HttpCode.CREATED).json(offer);
  });

  offersRouter.get(OffersApiPath.$OFFER_ID, (req, res) => {
    const {offerId} = req.params;
    const offer = offersService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK).json(offer);
  });

  offersRouter.put(OffersApiPath.$OFFER_ID, validateOffer, (req, res) => {
    const {offerId} = req.params;
    const existOffer = offersService.findOne(offerId!);

    if (!existOffer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    const updatedOffer = offersService.update(req.body as IOffer);

    return res.status(HttpCode.OK).json(updatedOffer);
  });

  offersRouter.delete(OffersApiPath.$OFFER_ID, (req, res) => {
    const {offerId} = req.params;
    const offer = offersService.drop(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(offer);
  });
};

export {initOffersApi};
