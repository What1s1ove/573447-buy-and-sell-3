import {Router} from 'express';
import {ApiPath} from '~/common/enums';

const offersRouter = Router();

const initOffersApi = (app: Router) => {
  app.use(ApiPath.OFFERS, offersRouter);
};

export {initOffersApi};
