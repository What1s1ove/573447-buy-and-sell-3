import { Offers } from '~/service/data';
import { HttpCode } from '~/common/enums';
import { Request, Response, NextFunction } from '~/common/types';
import { Params } from './common';

const existOffer = (service: Offers) => async (
  req: Request<Partial<Params>, null, null>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { offerId } = req.params;
  const offer = await service.findOne(Number(offerId));

  if (!offer) {
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Offer with ${offerId ?? ``} not found`);
  }

  res.locals.offer = offer;

  return next();
};

export { existOffer };
