import { Router } from 'express';
import { SsrMyPath } from '~/common/enums';

const myRouter = Router();

myRouter.get(SsrMyPath.ROOT, (_, res) => res.render(`my-tickets`));
myRouter.get(SsrMyPath.COMMENTS, (_, res) => res.render(`comments`));

export default myRouter;
