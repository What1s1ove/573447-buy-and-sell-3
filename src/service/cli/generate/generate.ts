import {
  getRandomItem,
  getRandomItems,
  getRandomNumber,
  getTwoDigitalString,
} from '~/helpers';
import {IOffer} from '~/common/interfaces';
import {CliCommandName, OfferType} from '~/common/enums';
import {MocksConfig} from './common';

const offerTypes = Object.values(OfferType);

const generateOffer = (): IOffer => ({
  title: getRandomItem(MocksConfig.TITLES),
  picture: `item${getTwoDigitalString(
    getRandomNumber(
      MocksConfig.PICTURE_NUMBER.MIN,
      MocksConfig.PICTURE_NUMBER.MAX
    )
  )}.jpg`,
  description: getRandomItems(
    MocksConfig.DESCRIPTION.DESCRIPTIONS,
    MocksConfig.DESCRIPTION.MAX_COUNT
  ).join(` `),
  type: getRandomItem(offerTypes),
  sum: getRandomNumber(MocksConfig.PRICE.MIN, MocksConfig.PRICE.MAX),
  category: getRandomItems(
    MocksConfig.CATEGORY.CATEGORIES,
    getRandomNumber(
      MocksConfig.CATEGORY.MIN_COUNT,
      MocksConfig.CATEGORY.CATEGORIES.length
    )
  ),
});

const generateMockedOffers = (count: number = MocksConfig.DEFAULT_COUNT): IOffer[] => {
  const mockedOffers = Array.from(new Array(count), generateOffer);

  return mockedOffers;
};

export default {
  name: CliCommandName.GENERATE,
  run: generateMockedOffers,
};
