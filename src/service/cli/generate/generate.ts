import {CliCommandName} from '~/common/enums';
import {saveOffersToFile, getOffersData, generateMockedOffers} from './helpers';
import {MocksConfig} from './common';

export default {
  name: CliCommandName.GENERATE,
  async run(args: string[]) {
    const [count] = args;
    const offersCount = Number(count) || MocksConfig.DEFAULT_COUNT;

    if (offersCount > MocksConfig.MAX_COUNT) {
      console.error(`Не больше 1000 объявлений`);

      return;
    }

    const {titles, descriptions, categories} = await getOffersData();
    const mockedOffers = generateMockedOffers({
      count: offersCount,
      titles,
      descriptions,
      categories,
    });

    await saveOffersToFile(mockedOffers);
  },
};
