import { Api } from '~/express/services';
import { ENV } from '~/common/enums';

const API_PORT = ENV.API_PORT || 3000;

const AppConfig = {
  PUBLIC_DIR: `public`,
  DEFAULT_PORT: 8080,
  API_URL: `http://localhost:${API_PORT}/api/`,
  API_TIMEOUT: 1000,
};

type SsrRouterSettings = {
  api: Api;
};

export { AppConfig, SsrRouterSettings };
