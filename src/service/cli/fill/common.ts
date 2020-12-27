import { GenerateMockedOfferCbArgs } from '~/common/types';

const FILL_FILE_PATH = `./db/fill-db.sql`;

enum TableName {
  CATEGORIES = `categories`,
  OFFER_TYPES = `offer_types`,
  USERS = `users`,
}

type GenerateMocksSqlCbArs<T = string[]> = {
  offerTypes: T;
} & GenerateMockedOfferCbArgs;

export { FILL_FILE_PATH, TableName, GenerateMocksSqlCbArs };
