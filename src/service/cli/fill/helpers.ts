import { getMockedImagePath, getRandomId, getRandomNumber } from '~/helpers';
import { MocksConfig, TableName } from '~/common/enums';
import { INCREASE_COUNT_FOR_IDX } from '~/common/constants';
import { GenerateMocksSqlCbArs } from './common';
import { MockedOffer } from '~/common/types';

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
  return sqlCommands.join(`\n\n`).trim();
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
  mockedOffers: MockedOffer[],
): string[] => {
  return mockedOffers.reduce<string[]>((acc, offer, idx) => {
    const commentsSqls = offer.comments.map((comment) => {
      const createdDate = new Date().toISOString();
      const userId = getRandomNumber(INCREASE_COUNT_FOR_IDX, users.length);
      const offerIdx = idx + INCREASE_COUNT_FOR_IDX;

      return generateInsertSqlRow(`'${createdDate}', '${comment.text}', ${userId}, ${offerIdx}`);
    });

    return [...acc, ...commentsSqls];
  }, []);
};

const generateOffersSqlRows = (
  { offerTypes, users }: GenerateMocksSqlCbArs,
  mockedOffers: MockedOffer[],
): string[] => {
  return mockedOffers.map((offer) => {
    const createdDate = new Date().toISOString();
    const userId = getRandomNumber(INCREASE_COUNT_FOR_IDX, users.length);
    const typeId = getRandomNumber(INCREASE_COUNT_FOR_IDX, offerTypes.length);

    return generateInsertSqlRow(
      `'${offer.picture ??  ``}', '${offer.title}', '${offer.description}', '${offer.sum}', '${createdDate}', ${userId}, ${typeId}`,
    );
  });
};

const generateOffersCategoriesRows = (
  { categories }: GenerateMocksSqlCbArs,
  mockedOffers: MockedOffer[],
): string[] => {
  return mockedOffers.reduce<string[]>((acc, offer, idx) => {
    const offerCategorySql = offer.categories.map((category) => {
      const currentCategoryIdx = categories.findIndex((it) => it === category);
      const offerId = idx + INCREASE_COUNT_FOR_IDX;
      const categoryId = currentCategoryIdx + INCREASE_COUNT_FOR_IDX;

      return `(${offerId}, ${categoryId})`;
    });

    return [...acc, ...offerCategorySql];
  }, []);
};

export {
  generateInsertSql,
  joinSqlCommands,
  generateUsersSqlRows,
  generateCategoriesSqlRows,
  generateOfferTypesSqlRows,
  generateCommentsSqlRows,
  generateOffersSqlRows,
  generateOffersCategoriesRows,
};
