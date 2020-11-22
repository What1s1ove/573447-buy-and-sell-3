import version from './version/version';
import help from './help/help';
import generate from './generate/generate';

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
};

export {Cli};
