import { MOCKS_FILE_PATH } from '~/common/constants';

const DATA_PATH = `./data`;

const MocksConfig = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
  FILE_NAME: MOCKS_FILE_PATH,
  TITLE: {
    FILE_PATH: `${DATA_PATH}/titles.txt`,
  },
  PICTURE_NUMBER: {
    MIN: 1,
    MAX: 16,
  },
  DESCRIPTION: {
    FILE_PATH: `${DATA_PATH}/sentences.txt`,
    MIN_COUNT: 1,
    MAX_COUNT: 5,
  },
  PRICE: {
    MIN: 1000,
    MAX: 10000,
  },
  CATEGORY: {
    FILE_PATH: `${DATA_PATH}/categories.txt`,
    MIN_COUNT: 1,
  },
  COMMENTS: {
    FILE_PATH: `${DATA_PATH}/comments.txt`,
    MIN_COUNT: 1,
    MAX_COUNT: 4,
    MIN_SENTENCES_COUNT: 1,
    MAX_SENTENCES_COUNT: 3,
  },
  USERS: {
    FILE_PATH: `${DATA_PATH}/users.txt`,
  },
};

export { MocksConfig };
