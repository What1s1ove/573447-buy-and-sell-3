import {CliCommandName} from '~/common/enums';

const outputHelpInfo = () => {
  const text = `
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
  `;

  console.info(text);
};

export default {
  name: CliCommandName.HELP,
  run: outputHelpInfo,
};
