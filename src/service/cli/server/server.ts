import express from 'express';
import apiRouter from '~/service/api/api';
import { paintMessage } from '~/helpers';
import { CliCommandName, HttpCode } from '~/common/enums';
import { API_PREFIX } from '~/common/constants';
import { DEFAULT_PORT } from './common';

const app = express();

app.use(express.json());
app.use(API_PREFIX, apiRouter);

app.use((_, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

export default {
  name: CliCommandName.SERVER,
  run(args: string[]): void {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    const server = app.listen(port, () => {
      console.info(paintMessage(`Ожидаю соединений на ${port}`, `green`));
    });

    server.once(`error`, (err) => {
      console.error(`Ошибка при создании сервера`, err);
    });
  },
};
