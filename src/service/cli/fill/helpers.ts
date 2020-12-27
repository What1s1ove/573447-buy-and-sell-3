import { getMockedImagePath, getRandomId, getRandomNumber } from '~/helpers';
import { MocksConfig } from '~/common/enums';
import { INCREASE_COUNT_FOR_IDX, INITIAL_ARRAY_IDX } from '~/common/constants';
import { GenerateMocksSqlCbArs, TableName } from './common';
import { IOffer } from '~/common/interfaces';

const generateInsertSql = (tableName: TableName, rows: string[]): string => {
  const comment = `/* ${tableName} */ `;
  const insert = `INSERT INTO ${tableName} VALUES`;
  const sqlRows = `  ${rows.join(`,\n  `)};`;

  return [comment, insert, sqlRows].join(`\n`).trim();
};

const generateInsertSqlRow = (rowPayload: string): string => {
  return `(DEFAULT, ${rowPayload})`;
};

const joinSqlCommands = (...sqlCommands: string[]): string => {
  const joinedSqlCommands = sqlCommands.join(`\n\n`).trim();

  return joinedSqlCommands;
};

const generateCategoriesSqlRows = ({
  categories,
}: GenerateMocksSqlCbArs): string[] => {
  return categories.map((category) => generateInsertSqlRow(`'${category}'`));
};

const generateOfferTypesSqlRows = ({
  offerTypes,
}: GenerateMocksSqlCbArs): string[] => {
  return offerTypes.map((offerType) => generateInsertSqlRow(`'${offerType}'`));
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

    return generateInsertSqlRow(`'${firstName}', '${lastName}', '${email}', '${password}', '${image}'`);
  });
};

const generateCommentsSqlRows = (
  { users }: GenerateMocksSqlCbArs,
  mockedOffers: IOffer[],
): string[] => {
  return mockedOffers.reduce<string[]>((acc, offer, idx) => {
    const commentsSqls = offer.comments.map((comment) => {
      const createdDate = new Date().toISOString();
      const userId = getRandomNumber(INITIAL_ARRAY_IDX, users.length);
      const offerIdx = idx + INCREASE_COUNT_FOR_IDX;

      return generateInsertSqlRow(`'${createdDate}', '${comment.text}', ${userId}, ${offerIdx}`);
    });

    return [...acc, ...commentsSqls];
  }, []);
};

const generateOffersSqlRows = (
  { offerTypes, users }: GenerateMocksSqlCbArs,
  mockedOffers: IOffer[],
): string[] => {
  return mockedOffers.map((offer) => {
    const createdDate = new Date().toISOString();
    const userId = getRandomNumber(INITIAL_ARRAY_IDX, users.length);
    const typeId = getRandomNumber(INITIAL_ARRAY_IDX, offerTypes.length);

    return generateInsertSqlRow(
      `'${offer.picture}', '${offer.title}', '${offer.description}', '${offer.sum}', '${createdDate}', ${userId}, ${typeId}`,
    );
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
