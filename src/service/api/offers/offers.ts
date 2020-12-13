import { Router } from 'express';
import { ApiPath, HttpCode, OfferKey, OffersApiPath } from '~/common/enums';
import {
  existOffer,
  validateComment,
  validateOffer,
} from '~/service/middlewares';
import { IOffer } from '~/common/interfaces';
import { Response, Request, OfferIdParam } from '~/common/types';
import { OffersApiServices } from './common';

const offersRouter = Router();

const initOffersApi = (app: Router, services: OffersApiServices): void => {
  const { offers: offersService, comments: commentsService } = services;

  app.use(ApiPath.OFFERS, offersRouter);

  offersRouter.get(OffersApiPath.ROOT, (_req, res) => {
    const offers = offersService.findAll();

    return res.status(HttpCode.OK).json(offers);
  });

  offersRouter.post(OffersApiPath.ROOT, validateOffer, (req, res) => {
    const offer = offersService.create(req.body);

    return res.status(HttpCode.CREATED).json(offer);
  });

  offersRouter.get(OffersApiPath.$OFFER_ID, (req, res) => {
    const { offerId } = req.params;
    const offer = offersService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK).json(offer);
  });

  offersRouter.put(OffersApiPath.$OFFER_ID, validateOffer, (req, res) => {
    const { offerId } = req.params;
    const offer = offersService.findOne(offerId as IOffer[OfferKey.ID]);

    if (!offer) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId ?? ``}`);
    }

    const updatedOffer = offersService.update(req.body as IOffer);

    return res.status(HttpCode.OK).json(updatedOffer);
  });

  offersRouter.delete(OffersApiPath.$OFFER_ID, (req, res) => {
    const { offerId } = req.params;
    const offer = offersService.drop(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(offer);
  });

  offersRouter.get(
    OffersApiPath.$OFFER_ID_COMMENTS,
    existOffer(offersService),
    (_, res) => {
      const { offer } = res.locals;
      const comments = commentsService.findAll(offer as IOffer);

      return res.status(HttpCode.OK).json(comments);
    },
  );

  offersRouter.post(
    OffersApiPath.$OFFER_ID_COMMENTS,
    [existOffer(offersService), validateComment],
    (req: Request<Partial<OfferIdParam>>, res: Response) => {
      const { offer } = res.locals;
      const comment = commentsService.create(offer as IOffer, req.body);

      return res.status(HttpCode.CREATED).json(comment);
    },
  );

  offersRouter.delete(
    OffersApiPath.$OFFER_ID_COMMENTS_$COMMENT_ID,
    existOffer(offersService),
    (req, res) => {
      const { offer } = res.locals;
      const { commentId } = req.params;
      const deletedComment = commentsService.drop(
        offer as IOffer,
        commentId as IOffer[OfferKey.ID],
      );

      if (!deletedComment) {
        return res.status(HttpCode.NOT_FOUND).send(`Not found`);
      }

      return res.status(HttpCode.OK).json(deletedComment);
    },
  );
};

export { initOffersApi };
