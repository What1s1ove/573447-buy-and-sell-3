import {paintMessage} from '~/helpers';
import {CliCommandName} from '~/common/enums';
import packageJsonFile from '~/../package.json';

const checkAppVersion = () => {
  const {version} = packageJsonFile;

  console.info(paintMessage(version, `gray`));
};

export default {
  name: CliCommandName.VERSION,
  run: checkAppVersion,
};
