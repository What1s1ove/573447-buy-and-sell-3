import { AppEnvironment, ENV } from '~/common/enums';
import { DbConfig } from './common';

const dbConfig: DbConfig = {
  [AppEnvironment.DEVELOPMENT]: {
    database: ENV.DB_NAME,
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USER,
    password: ENV.DB_PORT,
  },
  [AppEnvironment.PRODUCTION]: {
    database: ENV.DB_NAME,
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USER,
    password: ENV.DB_PORT,
  },
};

export { dbConfig };
