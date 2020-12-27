import {
  generateMockedOffers,
  getMockedOffersData,
  logger,
  paintMessage,
  writeToFile,
} from '~/helpers';
import { CliCommandName, MocksConfig, OfferType } from '~/common/enums';
import { TableName, FILL_FILE_PATH } from './common';
import {
  generateInsertSql,
  joinSqlCommands,
  generateUsersSqlRows,
  generateCategoriesSqlRows,
  generateOfferTypesSqlRows,
  generateCommentsSqlRows,
  generateOffersSqlRows,
} from './helpers';

const tableNameToSqlRowsGenerator = {
  [TableName.USERS]: generateUsersSqlRows,
  [TableName.CATEGORIES]: generateCategoriesSqlRows,
  [TableName.OFFER_TYPES]: generateOfferTypesSqlRows,
  [TableName.OFFERS]: generateOffersSqlRows,
  [TableName.COMMENTS]: generateCommentsSqlRows,
};

const offerTypes = Object.values(OfferType);

export default {
  name: CliCommandName.FILL,
  async run(args: string[]): Promise<void> {
    const [offersCount] = args;
    const count = Number(offersCount) || MocksConfig.DEFAULT_COUNT;

    const mockedOfferData = await getMockedOffersData();
    const generateArgs = {
      offerTypes,
      count,
      ...mockedOfferData,
    };
    const mockedOffers = generateMockedOffers(generateArgs);
    const generatedSqls = Object.entries(tableNameToSqlRowsGenerator).map(
      ([tableName, generator]) => {
        return generateInsertSql(
          tableName as TableName,
          generator(generateArgs, mockedOffers),
        );
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
