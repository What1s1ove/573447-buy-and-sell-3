import version from './version/version';
import help from './help/help';
import generate from './generate/generate';
import server from './server/server';

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
  [server.name]: server,
};

export { Cli };
