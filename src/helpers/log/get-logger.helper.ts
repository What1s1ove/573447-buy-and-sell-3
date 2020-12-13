import pino, { Logger, LoggerOptions, Level, } from 'pino';
import { AppEnvironment, ENV, LoggerName } from '~/common/enums';

const LOG_FILE = `./src/service/logs/api.log`;
const isDevMode = ENV.NODE_ENV === AppEnvironment.DEVELOPMENT;
const defaultLogLevel: Level = isDevMode ? `info` : `error`;

const loggerInstance = pino(
  {
    name: LoggerName.BASE_LOGGER,
    level: ENV.LOG_LEVEL ?? defaultLogLevel,
    prettyPrint: isDevMode,
  },
  isDevMode ? process.stdout : pino.destination(LOG_FILE),
);

const getLogger = (options: LoggerOptions = {}): Logger => {
  return loggerInstance.child(options);
};

export { getLogger };
