import {
  generateMockedComments,
  generateMockedOffers,
  getMockedImagePath,
  getRandomId,
  getRandomNumber,
} from '~/helpers';
import { MocksConfig } from '~/common/enums';
import { INCREASE_COUNT_FOR_IDX, INITIAL_ARRAY_IDX } from '~/common/constants';
import { GenerateMocksSqlCbArs, TableName } from './common';

const generateInsertSql = (tableName: TableName, rows: string[]): string => {
  const comment = `/* ${tableName} */ `;
  const insert = `INSERT INTO ${tableName} VALUES`;
  const sqlRows = `  ${rows.join(`,\n  `)};`;

  return [comment, insert, sqlRows].join(`\n`).trim();
};

const generateInsertSqlRow = (...args: (string | number)[]): string => {
  return `(DEFAULT, ${args.join(`, `)})`;
};

const joinSqlCommands = (...sqlCommands: string[]): string => {
  const joinedSqlCommands = sqlCommands.join(`\n\n`).trim();

  return joinedSqlCommands;
};

const generateCategoriesSqlRows = ({
  categories,
}: GenerateMocksSqlCbArs): string[] => {
  return categories.map((category) => generateInsertSqlRow(category));
};

const generateOfferTypesSqlRows = ({
  offerTypes,
}: GenerateMocksSqlCbArs): string[] => {
  return offerTypes.map((offerType) => generateInsertSqlRow(offerType));
};

const generateUsersSqlRows = ({ users }: GenerateMocksSqlCbArs): string[] => {
  return users.map((user) => {
    const [firstName, lastName, email] = user.split(` `);
    const password = getRandomId();
    const image = getMockedImagePath(
      MocksConfig.USER_PICTURE.TYPE,
      MocksConfig.USER_PICTURE.NUMBER.MIN,
      MocksConfig.USER_PICTURE.NUMBER.MAX,
    );

    return generateInsertSqlRow(firstName, lastName, email, password, image);
  });
};

const generateCommentsSqlRows = ({
  count: OfferCount,
  users,
  comments,
}: GenerateMocksSqlCbArs): string[] => {
  return new Array(OfferCount).fill(null).reduce<string[]>((acc, _, idx) => {
    const commentsCount = getRandomNumber(
      MocksConfig.COMMENTS.MIN_COUNT,
      MocksConfig.COMMENTS.MAX_COUNT,
    );
    const mockedComments = generateMockedComments({
      count: commentsCount,
      comments,
    });
    const commentsSqls = mockedComments.map((comment) => {
      const createdDate = new Date().toISOString();
      const userId = getRandomNumber(INITIAL_ARRAY_IDX, users.length);
      const offerIdx = idx + INCREASE_COUNT_FOR_IDX;

      return generateInsertSqlRow(createdDate, comment.text, userId, offerIdx);
    });

    return [...acc, ...commentsSqls];
  }, []);
};

const generateOffersSqlRows = ({
  offerTypes,
  ...restArgs
}: GenerateMocksSqlCbArs): string[] => {
  const { users } = restArgs;
  const mockedOffers = generateMockedOffers(restArgs);

  return mockedOffers.map((offer) => {
    const createdDate = new Date().toISOString();
    const userId = getRandomNumber(INITIAL_ARRAY_IDX, users.length);
    const typeId = getRandomNumber(INITIAL_ARRAY_IDX, offerTypes.length);

    return generateInsertSqlRow(offer.picture, offer.title, offer.description, offer.sum, createdDate, userId, typeId);
  });
};

export {
  generateInsertSql,
  joinSqlCommands,
  generateUsersSqlRows,
  generateCategoriesSqlRows,
  generateOfferTypesSqlRows,
  generateCommentsSqlRows,
  generateOffersSqlRows,
};
