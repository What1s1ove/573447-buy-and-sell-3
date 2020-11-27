import {Router, Request, Response} from 'express';
import {ApiOffersRoute} from '~/common/enums';

const offersRouter = Router();

offersRouter.get(ApiOffersRoute.OFFER, (req: Request, res: Response) => res.send(req.path));
offersRouter.get(ApiOffersRoute.EDIT, (req: Request, res: Response) => res.send(req.path));
offersRouter.get(ApiOffersRoute.ADD, (req: Request, res: Response) => res.send(req.path));
offersRouter.get(ApiOffersRoute.CATEGORY, (req: Request, res: Response) => res.send(req.path));

export default offersRouter;
