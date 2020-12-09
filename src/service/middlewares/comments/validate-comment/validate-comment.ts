import {HttpCode} from '~/common/enums';
import {Request, Response, NextFunction, CreatedComment} from '~/common/types';
import {checkIsValidComment} from './helpers';
import {Params} from './common';

const validateComment = (
  req: Request<Partial<Params>, unknown, CreatedComment>,
  res: Response,
  next: NextFunction
): void => {
  const newComment = req.body;
  const isValidComment = checkIsValidComment(newComment);

  if (!isValidComment) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  next();
};

export {validateComment};
