import {
  getMockedOffersData,
  logger,
  paintMessage,
  writeToFile,
} from '~/helpers';
import { CliCommandName, OfferType } from '~/common/enums';
import { TableName, FILL_FILE_PATH } from './common';
import {
  generateInsertSql,
  joinSqlCommands,
  generateUsersSqlRows,
  generateCategoriesSqlRows,
  generateOfferTypesSqlRows,
} from './helpers';

const tableNameToSqlRowsGenerator = {
  [TableName.USERS]: generateUsersSqlRows,
  [TableName.CATEGORIES]: generateCategoriesSqlRows,
  [TableName.OFFER_TYPES]: generateOfferTypesSqlRows,
};

const offerTypes = Object.values(OfferType);

export default {
  name: CliCommandName.FILL,
  async run(_args: string[]): Promise<void> {
    const mockedOfferData = await getMockedOffersData();
    const sqlMocks = {
      ...mockedOfferData,
      offerTypes,
    };
    const generatedSqls = Object.entries(tableNameToSqlRowsGenerator).map(
      ([tableName, generator]) => {
        return generateInsertSql(tableName as TableName, generator(sqlMocks));
      },
    );
    const sql = joinSqlCommands(...generatedSqls);

    try {
      await writeToFile(FILL_FILE_PATH, sql);

      logger.info(
        paintMessage(
          `Operation success. File with fill-data was created.`,
          `green`,
        ),
      );
    } catch {
      logger.error(
        paintMessage(
          `An error occurred on saving fill-db: can't write fill-db to file...`,
          `red`,
        ),
      );
    }
  },
};
