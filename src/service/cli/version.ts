import {CliCommandName} from '~/src/common/enums';
import packageJsonFile from '~/package.json';

const checkAppVersion = () => {
  const {version} = packageJsonFile;

  console.info(version);
};

export default {
  name: CliCommandName.VERSION,
  run: checkAppVersion,
};
