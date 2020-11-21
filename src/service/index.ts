import {CliCommandName, CliExitCode} from '~/common/enums';
import {USER_ARGV_IDX, COMMAND_ARGS_IDX} from '~/common/constants';
import {cli} from './cli';

const userArguments = process.argv.slice(USER_ARGV_IDX);
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
    cli.generate.run(userArguments.slice(COMMAND_ARGS_IDX));

    break;
  }
  default: {
    cli.help.run();

    process.exit(CliExitCode.SUCCESS);
  }
}
