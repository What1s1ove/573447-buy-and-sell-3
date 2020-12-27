import { MocksConfig } from '~/common/enums';
import { getMockedImagePath, getRandomId } from '~/helpers';
import { GenerateMocksSqlCbArs, TableName } from './common';

const generateInsertSql = (tableName: TableName, rows: string[]): string => {
  const comment = `/* ${tableName} */ `;
  const insert = `INSERT INTO ${tableName} VALUES`;
  const sqlRows = `  ${rows.join(`,\n  `)};`;

  return [comment, insert, sqlRows].join(`\n`).trim();
};

const joinSqlCommands = (...sqlCommands: string[]): string => {
  const joinedSqlCommands = sqlCommands.join(`\n\n`).trim();

  return joinedSqlCommands;
};

const generateCategoriesSqlRows = ({
  categories,
}: GenerateMocksSqlCbArs): string[] => {
  return categories.map((category) => `(DEFAULT, '${category}')`);
};

const generateOfferTypesSqlRows = ({
  offerTypes,
}: GenerateMocksSqlCbArs): string[] => {
  return offerTypes.map((offerType) => `(DEFAULT, '${offerType}')`);
};

const generateUsersSqlRows = ({ users }: GenerateMocksSqlCbArs): string[] => {
  return users.map((user) => {
    const [firstName, lastName, email] = user.split(` `);

    return `(DEFAULT, '${firstName}', '${lastName}', '${email}', '${getRandomId()}', '${getMockedImagePath(
      MocksConfig.USER_PICTURE.TYPE,
      MocksConfig.USER_PICTURE.NUMBER.MIN,
      MocksConfig.USER_PICTURE.NUMBER.MAX,
    )}')`;
  });
};

export {
  generateInsertSql,
  joinSqlCommands,
  generateUsersSqlRows,
  generateCategoriesSqlRows,
  generateOfferTypesSqlRows,
};
