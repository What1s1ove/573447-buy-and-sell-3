import { GenerateMockedOffersCbArgs } from '~/common/types';

const FILL_FILE_PATH = `./db/fill-db.sql`;

enum TableName {
  CATEGORIES = `categories`,
  OFFER_TYPES = `offer_types`,
  USERS = `users`,
  COMMENTS = `comments`,
  OFFERS = `offers`,
}

type GenerateMocksSqlCbArs<T = string[]> = {
  offerTypes: T;
} & GenerateMockedOffersCbArgs;

export { FILL_FILE_PATH, TableName, GenerateMocksSqlCbArs };
