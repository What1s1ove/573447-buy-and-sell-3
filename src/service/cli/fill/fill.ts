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
  generateCategoriesSqlRows,
  generateOfferTypesSqlRows,
} from './helpers';

const offerTypes = Object.values(OfferType);

export default {
  name: CliCommandName.FILL,
  async run(_args: string[]): Promise<void> {
    const { categories } = await getMockedOffersData();
    const catagoriesSql = generateInsertSql(
      TableName.CATEGORIES,
      generateCategoriesSqlRows(categories),
    );
    const offerTypesSql = generateInsertSql(
      TableName.OFFER_TYPES,
      generateOfferTypesSqlRows(offerTypes),
    );
    const sql = joinSqlCommands(catagoriesSql, offerTypesSql);


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
