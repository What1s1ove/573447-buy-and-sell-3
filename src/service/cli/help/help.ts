import { logger, paintMessage } from '~/helpers';
import { CliCommandName } from '~/common/enums';

const outputHelpInfo = (): void => {
  const text = `
    Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
  `;

  logger.info(paintMessage(text, `gray`));
};

export default {
  name: CliCommandName.HELP,
  run: outputHelpInfo,
};
