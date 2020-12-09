import {HttpCode} from '~/common/enums';
import {
  Request,
  Response,
  NextFunction,
  CreatedOffer,
  OfferIdParam,
} from '~/common/types';
import {checkIsValidOffer} from './helpers';
import {Params} from './common';

const validateOffer = (
  req: Request<Partial<Params>, unknown, CreatedOffer>,
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
