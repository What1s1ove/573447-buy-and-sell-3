import {HttpCode} from '~/common/enums';
import {Request, Response, NextFunction, CreatedOffer} from '~/common/types';
import {checkIsValidOffer} from './helpers';
import {Params} from './common';

const validateOffer = (
  req: Request<Partial<Params>, unknown, CreatedOffer>,
  res: Response,
  next: NextFunction
): Response | void => {
  const newOffer = req.body;
  const isValidOffer = checkIsValidOffer(newOffer);

  if (!isValidOffer) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};

export {validateOffer};
