import {Router} from 'express';
import {ApiMainRoute} from '~/common/enums';

const mainRouter = Router();

mainRouter.get(ApiMainRoute.ROOT, (_, res) => res.render(`main`));
mainRouter.get(ApiMainRoute.REGISTER, (_, res) => res.render(`sign-up`));
mainRouter.get(ApiMainRoute.LOGIN, (_, res) => res.render(`login`));
mainRouter.get(ApiMainRoute.SEARCH, (_, res) => res.render(`search-result`));

export default mainRouter;
