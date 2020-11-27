import {Router, Request, Response} from 'express';
import {ApiMyRoute} from '~/common/enums';

const myRouter = Router();

myRouter.get(ApiMyRoute.ROOT, (req: Request, res: Response) => res.send(req.path));
myRouter.get(ApiMyRoute.COMMENTS, (req: Request, res: Response) => res.send(req.path));

export default myRouter;
