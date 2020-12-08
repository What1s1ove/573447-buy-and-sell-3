import {paintMessage} from '~/helpers';
import {CliCommandName} from '~/common/enums';
import packageJsonFile from '~/../package.json';

const checkAppVersion = (): void => {
  const {version} = packageJsonFile;

  console.info(paintMessage(version, `blue`));
};

export default {
  name: CliCommandName.VERSION,
  run: checkAppVersion,
};
