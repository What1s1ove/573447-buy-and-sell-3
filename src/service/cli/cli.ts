import version from './version/version';
import help from './help/help';
import filldb from './filldb/filldb';
import server from './server/server';
import fill from './fill/fill';

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [filldb.name]: filldb,
  [server.name]: server,
  [fill.name]: fill,
};

export { Cli };
