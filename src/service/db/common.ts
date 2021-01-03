import { AppEnvironment } from '~/common/enums';

type DbEnvironmentConfig = {
  database: string;
  host: string;
  port: string;
  username: string;
  password: string;
};

type DbConfig = Record<AppEnvironment, DbEnvironmentConfig>;

export { DbEnvironmentConfig, DbConfig };
