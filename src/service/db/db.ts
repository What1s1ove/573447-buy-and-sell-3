import { Sequelize } from 'sequelize';
import { AppEnvironment, ENV } from '~/common/enums';
import { DbEnvironmentConfig } from './common';
import { dbConfig } from './sequelize-config';

const environment = ENV.NODE_ENV ?? AppEnvironment.DEVELOPMENT;
const config: DbEnvironmentConfig = dbConfig[environment];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: Number(config.port),
    dialect: `postgres`,
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 10000,
    },
  },
);

export default sequelize;
