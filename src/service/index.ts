import {CliCommandName, CliExitCode} from '~/common/enums';
import {CLI_USER_ARGV_IDX} from '~/common/constants';
import {cli} from './cli';

const userArguments = process.argv.slice(CLI_USER_ARGV_IDX);
const [userCommand] = userArguments;

switch (userCommand) {
  case CliCommandName.VERSION: {
    cli.version.run();

    break;
  }
  case CliCommandName.HELP: {
    cli.help.run();

    break;
  }
  case CliCommandName.GENERATE: {
    cli.generate.run();

    break;
  }
  default: {
    cli.help.run();

    process.exit(CliExitCode.SUCCESS);
  }
}
