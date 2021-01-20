import { Router } from 'express';
import { existOffer, validateSchema, validateParamSchema } from '~/service/middlewares';
import { offer as offerSchema, comment as commentSchema, routeId as routeIdSchema } from '~/schemas';
import { ApiPath, HttpCode, OffersApiPath, RequestParam } from '~/common/enums';
import { IOffer } from '~/common/interfaces';
import { Response, Request, OfferIdParam } from '~/common/types';
import { OffersApiServices } from './common';

const initOffersApi = (app: Router, services: OffersApiServices): void => {
  const offersRouter = Router();

  const { offers: offersService, comments: commentsService } = services;

  app.use(ApiPath.OFFERS, offersRouter);

  offersRouter.get(OffersApiPath.ROOT, async (req, res) => {
    const { offset, limit } = req.query;
    const isUsePagination = Boolean(offset ?? limit);

    const offers = isUsePagination
      ? await offersService.findPage({
        offset: Number(offset),
        limit: Number(limit),
      })
      : await offersService.findAll();

    return res.status(HttpCode.OK).json(offers);
  });

  offersRouter.post(
    OffersApiPath.ROOT,
    validateSchema(offerSchema),
    async (req, res) => {
      const offer = await offersService.create(req.body);

      return res.status(HttpCode.CREATED).json(offer);
    },
  );

  offersRouter.get(
    OffersApiPath.$OFFER_ID,
    validateParamSchema(routeIdSchema, RequestParam.OFFER_ID),
    async (req: Request<Partial<OfferIdParam>>, res) => {
      const { offerId } = req.params;
      const offer = await offersService.findOne(Number(offerId));

      if (!offer) {
        return res.status(HttpCode.NOT_FOUND).send(`Not found with ${offerId ?? ``}`);
      }

      return res.status(HttpCode.OK).json(offer);
    },
  );

  offersRouter.put(
    OffersApiPath.$OFFER_ID,
    [
      validateSchema(offerSchema),
      validateParamSchema(routeIdSchema, RequestParam.OFFER_ID),
    ],
    async (req: Request<Partial<OfferIdParam>>, res: Response) => {
      const { offerId } = req.params;
      const parsedOfferId = Number(offerId);
      const offer = await offersService.findOne(parsedOfferId);

      if (!offer) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found with ${offerId ?? ``}`);
      }

      const isOfferUpdated = await offersService.update(
        req.body as IOffer,
        parsedOfferId,
      );

      return res.status(HttpCode.OK).json(isOfferUpdated);
    },
  );

  offersRouter.delete(
    OffersApiPath.$OFFER_ID,
    validateParamSchema(routeIdSchema, RequestParam.OFFER_ID),
    async (req: Request<Partial<OfferIdParam>>, res) => {
      const { offerId } = req.params;
      const isOfferDeleted = await offersService.drop(Number(offerId));

      if (!isOfferDeleted) {
        return res.status(HttpCode.NOT_FOUND).send(`Not found`);
      }

      return res.status(HttpCode.OK).json(isOfferDeleted);
    },
  );

  offersRouter.get(
    OffersApiPath.$OFFER_ID_COMMENTS,
    [
      validateParamSchema(routeIdSchema, RequestParam.OFFER_ID),
      existOffer(offersService),
    ],
    async (req: Request<Partial<OfferIdParam>>, res: Response) => {
      const { offerId } = req.params;
      const comments = await commentsService.findAll(Number(offerId));

      return res.status(HttpCode.OK).json(comments);
    },
  );

  offersRouter.post(
    OffersApiPath.$OFFER_ID_COMMENTS,
    [
      existOffer(offersService),
      validateSchema(commentSchema),
      validateParamSchema(routeIdSchema, RequestParam.OFFER_ID),
    ],
    async (req: Request<Partial<OfferIdParam>>, res: Response) => {
      const { offerId } = req.params;
      const comment = await commentsService.create(Number(offerId), req.body);

      return res.status(HttpCode.CREATED).json(comment);
    },
  );

  offersRouter.delete(
    OffersApiPath.$OFFER_ID_COMMENTS_$COMMENT_ID,
    [
      existOffer(offersService),
      validateParamSchema(routeIdSchema, RequestParam.OFFER_ID),
      validateParamSchema(routeIdSchema, RequestParam.COMMENT_ID),
    ],
    async (req: Request<Partial<OfferIdParam>>, res: Response) => {
      const { commentId } = req.params;
      const isCommentDeleted = await commentsService.drop(Number(commentId));

      if (!isCommentDeleted) {
        return res.status(HttpCode.NOT_FOUND).send(`Not found`);
      }

      return res.status(HttpCode.OK).json(isCommentDeleted);
    },
  );
};

export { initOffersApi };
