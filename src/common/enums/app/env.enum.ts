const {
  NODE_ENV,
  LOG_LEVEL,
  API_PORT,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} = process.env;

const ENV = {
  NODE_ENV: NODE_ENV ?? ``,
  LOG_LEVEL: LOG_LEVEL ?? ``,
  API_PORT: API_PORT ?? ``,
  PORT: PORT ?? ``,
  DB_HOST: DB_HOST ?? ``,
  DB_PORT: DB_PORT ?? ``,
  DB_NAME: DB_NAME ?? ``,
  DB_USER: DB_USER ?? ``,
  DB_PASSWORD: DB_PASSWORD ?? ``,
};

export { ENV };
