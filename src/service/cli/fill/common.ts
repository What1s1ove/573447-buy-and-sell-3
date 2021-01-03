import { GenerateMockedOffersCbArgs } from '~/common/types';

const FILL_FILE_PATH = `./db/fill-db.sql`;

type GenerateMocksSqlCbArs<T = string[]> = {
  offerTypes: T;
} & GenerateMockedOffersCbArgs;

export { FILL_FILE_PATH, GenerateMocksSqlCbArs };
