import {Offers} from '~/service/data';
import {HttpCode} from '~/common/enums';
import {Request, Response, NextFunction} from '~/common/types';
import {OfferParams} from './common';

const existOffer = (service: Offers) => (
  req: Request<OfferParams, null, null>,
  res: Response,
  next: NextFunction
): void => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId!);

  if (!offer) {
    res.status(HttpCode.NOT_FOUND).send(`Offer with ${offerId} not found`);

    return;
  }

  res.locals.offer = offer;

  next();
};

export {existOffer};
