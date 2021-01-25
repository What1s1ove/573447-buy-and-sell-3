import { Dialect } from 'sequelize/types';
import { AppEnvironment, ENV } from '~/common/enums';
import { DbConfig } from './common';

const dbConfig: DbConfig = {
  [AppEnvironment.DEVELOPMENT]: {
    database: ENV.DB_NAME ?? ``,
    host: ENV.DB_HOST ?? ``,
    port: ENV.DB_PORT ?? ``,
    username: ENV.DB_USER ?? ``,
    password: ENV.DB_PASSWORD ?? ``,
    dialect: (ENV.DB_DIALECT ?? ``) as Dialect,
  },
};

export { dbConfig };
