import http from 'http';
import {paintMessage} from '~/helpers';
import {CliCommandName, HttpCode} from '~/common/enums';
import {IncomingMessage, ServerResponse} from '~/common/types';
import {getMocks, getOffersListMarkup, sendResponse} from './helpers';
import {ServerPath, DEFAULT_PORT} from './common';

const onClientConnect = async (req: IncomingMessage, res: ServerResponse) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case ServerPath.ROOT: {
      try {
        const mockedOffers = await getMocks();
        const markup = getOffersListMarkup(mockedOffers);
        sendResponse(res, HttpCode.OK, markup);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }

      break;
    }
    default: {
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);

      break;
    }
  }
};

export default {
  name: CliCommandName.SERVER,
  run(args: string[]) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    http
      .createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err: Error) => {
        if (err) {
          console.error(
            paintMessage(`Ошибка при создании сервера, ${err}`, `red`)
          );

          return;
        }

        console.info(paintMessage(`Ожидаю соединений на ${port}`, `green`));
      });
  },
};
