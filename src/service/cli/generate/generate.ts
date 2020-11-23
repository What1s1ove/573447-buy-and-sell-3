import {
  getRandomItem,
  getRandomItems,
  getRandomNumber,
  getTwoDigitalString,
} from '~/helpers';
import {IOffer} from '~/common/interfaces';
import {CliCommandName, OfferType} from '~/common/enums';
import { saveOffersToFile, readOfferFileContent } from './helpers';
import {
  MocksConfig,
  GenerateMockedOfferCbArgs,
  GenerateMockedOffersCbArgs,
} from './common';

const offerTypes = Object.values(OfferType);

const generateOffer = ({
  titles,
  descriptions,
  categories,
}: GenerateMockedOfferCbArgs): IOffer => ({
  title: getRandomItem(titles),
  picture: `item${getTwoDigitalString(
    getRandomNumber(
      MocksConfig.PICTURE_NUMBER.MIN,
      MocksConfig.PICTURE_NUMBER.MAX
    )
  )}.jpg`,
  description: getRandomItems(
    descriptions,
    getRandomNumber(
      MocksConfig.DESCRIPTION.MIN_COUNT,
      MocksConfig.DESCRIPTION.MAX_COUNT
    )
  ).join(` `),
  type: getRandomItem(offerTypes),
  sum: getRandomNumber(MocksConfig.PRICE.MIN, MocksConfig.PRICE.MAX),
  category: getRandomItems(
    categories,
    getRandomNumber(MocksConfig.CATEGORY.MIN_COUNT, categories.length)
  ),
});

const generateMockedOffers = ({count, titles, categories, descriptions}: GenerateMockedOffersCbArgs): IOffer[] => {
  const mockedOffers = Array.from(new Array(count), () =>
    generateOffer({titles, categories, descriptions})
  );

  return mockedOffers;
};

export default {
  name: CliCommandName.GENERATE,
  async run(args: string[]) {
    const [count] = args;
    const offersCount = Number(count) || MocksConfig.DEFAULT_COUNT;

    if (offersCount > MocksConfig.MAX_COUNT) {
      console.error(`Не больше 1000 объявлений`);

      return;
    }

    const titles = await readOfferFileContent(MocksConfig.TITLE.FILE_PATH);
    const descriptions = await readOfferFileContent(MocksConfig.DESCRIPTION.FILE_PATH);
    const categories = await readOfferFileContent(MocksConfig.CATEGORY.FILE_PATH);
    const mockedOffers = generateMockedOffers({
      count: offersCount,
      titles,
      descriptions,
      categories,
    });

    await saveOffersToFile(mockedOffers);
  },
};
