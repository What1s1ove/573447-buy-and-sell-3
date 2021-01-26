import { SsrMainPath } from '~/common/enums';
import {
  Request,
  Response,
  NextFunction,
  SessionRequest,
} from '~/common/types';

const checkUserAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { user } = req.session as SessionRequest;
  const isLogin = Boolean(user);

  if (!isLogin) {
    return res.redirect(SsrMainPath.LOGIN);
  }

  return next();
};

export { checkUserAuthenticate };
