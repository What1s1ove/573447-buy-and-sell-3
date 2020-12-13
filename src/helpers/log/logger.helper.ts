import pino, { Logger, LoggerOptions, Level } from 'pino';
import { AppEnvironment } from '~/common/enums';

const LOG_FILE = `./logs/api.log`;
const isDevMode = process.env.NODE_ENV === AppEnvironment.DEVELOPMENT;
const defaultLogLevel: Level = isDevMode ? `info` : `error`;

const loggerInstance = pino(
  {
    name: `base-logger`,
    level: process.env.LOG_LEVEL || defaultLogLevel,
    prettyPrint: isDevMode,
  },
  isDevMode ? process.stdout : pino.destination(LOG_FILE),
);

const logger = {
  loggerInstance,
  getLogger(options: LoggerOptions = {}): Logger {
    return loggerInstance.child(options);
  },
};

export { logger };
