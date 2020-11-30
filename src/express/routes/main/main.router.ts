import {Router} from 'express';
import {SsrMainPath} from '~/common/enums';

const mainRouter = Router();

mainRouter.get(SsrMainPath.ROOT, (_, res) => res.render(`main`));
mainRouter.get(SsrMainPath.REGISTER, (_, res) => res.render(`sign-up`));
mainRouter.get(SsrMainPath.LOGIN, (_, res) => res.render(`login`));
mainRouter.get(SsrMainPath.SEARCH, (_, res) => res.render(`search-result`));

export default mainRouter;
