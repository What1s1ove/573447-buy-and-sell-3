import {Router} from 'express';
import {ApiOffersRoute} from '~/common/enums';

const offersRouter = Router();

offersRouter.get(ApiOffersRoute.OFFER, (_, res) => res.render(`category`));
offersRouter.get(ApiOffersRoute.EDIT, (_, res) => res.render(`offers/new-ticket`));
offersRouter.get(ApiOffersRoute.ADD, (_, res) => res.render(`offers/ticket-edit`));
offersRouter.get(ApiOffersRoute.CATEGORY, (_, res) => res.render(`offers/ticket`));

export default offersRouter;
