import {
  paintMessage,
  getMockedOffersData,
  generateMockedOffers,
  logger,
} from '~/helpers';
import { CliCommandName, MocksConfig } from '~/common/enums';
import sequelize from '~/service/db/db';
import { initDb } from '~/service/db/init-db';

export default {
  name: CliCommandName.FILLDB,
  async run(args: string[]): Promise<void> {
    try {
      logger.info(`Trying to connect to database...`);

      await sequelize.authenticate();

      logger.info(`Connection to database established`);
    } catch (err) {
      logger.error(`An error occurred: ${(err as Error).message}`);

      throw err;
    }

    const [count] = args;
    const offersCount = Number(count) || MocksConfig.DEFAULT_COUNT;

    if (offersCount > MocksConfig.MAX_COUNT) {
      console.error(
        paintMessage(
          `An error occurred on creating mocked data: No more than 1000 offers.`,
          `red`,
        ),
      );
      return;
    }

    const {
      titles,
      descriptions,
      categories,
      comments,
      users,
      offerTypes,
    } = await getMockedOffersData();
    const mockedOffers = generateMockedOffers({
      count: offersCount,
      titles,
      descriptions,
      categories,
      comments,
      users,
      offerTypes,
    });

    initDb(sequelize, {
      offers: mockedOffers,
      categories,
      offerTypes,
    });
  },
};
