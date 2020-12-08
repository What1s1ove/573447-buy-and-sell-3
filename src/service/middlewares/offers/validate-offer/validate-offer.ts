import {HttpCode} from '~/common/enums';
import {Request, Response, NextFunction, CreatedOffer} from '~/common/types';
import {checkIsValidOffer} from './helpers';
import {OfferParams} from './common';

const validateOffer = (
  req: Request<OfferParams, unknown, CreatedOffer>,
  res: Response,
  next: NextFunction
): void => {
  const newOffer = req.body;
  const isValidOffer = checkIsValidOffer(newOffer);

  if (!isValidOffer) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  next();
};

export {validateOffer};
