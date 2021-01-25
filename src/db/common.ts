import { Dialect } from 'sequelize/types';
import { AppEnvironment } from '~/common/enums';

type DbEnvironmentConfig = {
  database: string;
  host: string;
  port: string;
  username: string;
  password: string;
  dialect: Dialect;
};

type DbConfig = Record<AppEnvironment, DbEnvironmentConfig>;

export { DbEnvironmentConfig, DbConfig };
