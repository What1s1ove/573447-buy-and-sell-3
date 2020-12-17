import path from 'path';
import express from 'express';
import { Api } from '~/express/services';
import { initMainRouter } from '~/express/routes/main/main.router';
import {initMyRouter} from '~/express/routes/my/my.router';
import offersRouter from '~/express/routes/offers/offers.router';
import { SsrPath, HttpCode, ENV } from '~/common/enums';
import { Request, Response, NextFunction } from '~/common/types';
import { AppConfig } from './common';

const app = express();
const api = new Api({
  baseURL: AppConfig.API_URL,
  timeout: AppConfig.API_TIMEOUT,
});

initMainRouter(app, {
  api,
});
initMyRouter(app, {
  api,
});

app.use(SsrPath.OFFERS, offersRouter);

app.use(express.static(path.resolve(__dirname, AppConfig.PUBLIC_DIR)));

app.use((_, res) => res.status(HttpCode.BAD_REQUEST).render(`errors/404`));
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => (
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`)
));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(ENV.PORT ?? AppConfig.DEFAULT_PORT);
