import path from 'path';
import express, {Request, Response, NextFunction} from 'express';
import {ApiRoute, HttpCode} from '~/common/enums';
import mainRouter from '~/express/routes/main/main.router';
import myRouter from '~/express/routes/my/my.router';
import offersRouter from '~/express/routes/offers/offers.router';

const PUBLIC_DIR = `public`;
const DEFAULT_PORT = 8080;

const app = express();

app.use(ApiRoute.MAIN, mainRouter);
app.use(ApiRoute.MY, myRouter);
app.use(ApiRoute.OFFERS, offersRouter);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use((_, res) => res.status(HttpCode.BAD_REQUEST).render(`errors/404`));
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) =>
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`)
);

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT);
