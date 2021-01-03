import {
  paintMessage,
  getMockedOffersData,
  generateMockedOffers,
} from '~/helpers';
import { CliCommandName, MocksConfig } from '~/common/enums';
import { saveOffersToFile } from './helpers';

export default {
  name: CliCommandName.GENERATE,
  async run(args: string[]): Promise<void> {
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
    } = await getMockedOffersData();
    const mockedOffers = generateMockedOffers({
      count: offersCount,
      titles,
      descriptions,
      categories,
      comments,
      users,
    });

    await saveOffersToFile(mockedOffers);
  },
};
