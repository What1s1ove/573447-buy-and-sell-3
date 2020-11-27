import {Router, Request, Response} from 'express';
import {ApiMainRoute} from '~/common/enums';

const mainRouter = Router();

mainRouter.get(ApiMainRoute.ROOT, (req: Request, res: Response) => res.send(req.path));
mainRouter.get(ApiMainRoute.REGISTER, (req: Request, res: Response) => res.send(req.path));
mainRouter.get(ApiMainRoute.LOGIN, (req: Request, res: Response) => res.send(req.path));
mainRouter.get(ApiMainRoute.SEARCH, (req: Request, res: Response) => res.send(req.path));

export default mainRouter;
