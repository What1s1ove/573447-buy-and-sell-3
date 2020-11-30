import {Router} from 'express';
import {SsrOffersPath} from '~/common/enums';

const offersRouter = Router();

offersRouter.get(SsrOffersPath.OFFER, (_, res) => res.render(`category`));
offersRouter.get(SsrOffersPath.EDIT, (_, res) => res.render(`offers/new-ticket`));
offersRouter.get(SsrOffersPath.ADD, (_, res) => res.render(`offers/ticket-edit`));
offersRouter.get(SsrOffersPath.CATEGORY, (_, res) => res.render(`offers/ticket`));

export default offersRouter;
