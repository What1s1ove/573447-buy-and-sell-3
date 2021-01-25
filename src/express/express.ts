import path from 'path';
import express from 'express';
import { Api, DiskStorage } from '~/express/services';
import { initMainRouter } from '~/express/routes/main/main.router';
import { initMyRouter } from '~/express/routes/my/my.router';
import { initOffersRouter } from '~/express/routes/offers/offers.router';
import { HttpCode, ENV } from '~/common/enums';
import { Request, Response, NextFunction } from '~/common/types';
import { sessionMiddleware } from './session';
import { AppConfig } from './common';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);

const uploadImgPath = path.resolve(__dirname, `./${AppConfig.UPLOAD_DIR}/img/`);
const routers = [initMainRouter, initMyRouter, initOffersRouter];
const api = new Api({
  baseURL: AppConfig.API_URL,
  timeout: AppConfig.API_TIMEOUT,
});
const storage = new DiskStorage({
  destination: uploadImgPath,
});

routers.forEach((routeInit) => {
  routeInit(app, {
    api,
    storage,
  });
});

app.use(express.static(path.resolve(__dirname, AppConfig.PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, AppConfig.UPLOAD_DIR)));

app.use((_, res) => res.status(HttpCode.BAD_REQUEST).render(`errors/404`));
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => (
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`)
));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(ENV.PORT ?? AppConfig.DEFAULT_PORT);
