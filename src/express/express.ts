import path from 'path';
import express from 'express';
import {ApiRoute} from '~/common/enums';
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
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT);
