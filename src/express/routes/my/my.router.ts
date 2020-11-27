import {Router} from 'express';
import {ApiMyRoute} from '~/common/enums';

const myRouter = Router();

myRouter.get(ApiMyRoute.ROOT, (_, res) => res.render(`my-tickets`));
myRouter.get(ApiMyRoute.COMMENTS, (_, res) => res.render(`comments`));

export default myRouter;
