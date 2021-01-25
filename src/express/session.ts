import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import sequelize from '~/db/db';
import { ENV, TableName, SessionExpiration } from '~/common/enums';

const SequelizeStoreInstance = SequelizeStore(session.Store);

const appSessionStore = new SequelizeStoreInstance({
  db: sequelize,
  expiration: SessionExpiration.PERIOD,
  checkExpirationInterval: SessionExpiration.CHECK,
  tableName: TableName.SESSIONS,
});

const sessionMiddleware = session({
  secret: ENV.SECRET as string,
  store: appSessionStore,
  resave: false,
  proxy: true,
  saveUninitialized: false,
  name: `session_id`,
});

export { sessionMiddleware };
