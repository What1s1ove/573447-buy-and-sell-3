import {CliCommandName} from '~/common/enums';
import {saveOffersToFile, getOffersData, generateMockedOffers} from './helpers';
import {MocksConfig} from './common';

export default {
  name: CliCommandName.GENERATE,
  async run(args: string[]): Promise<void> {
    const [count] = args;
    const offersCount = Number(count) || MocksConfig.DEFAULT_COUNT;

    if (offersCount > MocksConfig.MAX_COUNT) {
      console.error(`Не больше 1000 объявлений`);

      return;
    }

    const {titles, descriptions, categories, comments} = await getOffersData();
    const mockedOffers = generateMockedOffers({
      count: offersCount,
      titles,
      descriptions,
      categories,
      comments,
    });

    await saveOffersToFile(mockedOffers);
  },
};
