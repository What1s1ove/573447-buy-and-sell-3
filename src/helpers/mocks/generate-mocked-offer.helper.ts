import { getRandomId, getTwoDigitalString } from '~/helpers/string';
import { getRandomItems, getRandomItem } from '~/helpers/array';
import { getRandomNumber } from '~/helpers/number';
import { generateMockedComments } from '~/helpers/mocks/generate-mocked-comments.helper';
import { MocksConfig, OfferType } from '~/common/enums';
import { GenerateMockedOfferCbArgs } from '~/common/types';
import { IOffer } from '~/common/interfaces';

const offerTypes = Object.values(OfferType);

const generateMockedOffer = ({
  titles,
  descriptions,
  categories,
  comments,
}: GenerateMockedOfferCbArgs): IOffer => ({
  id: getRandomId(),
  title: getRandomItem(titles),
  picture: `item${getTwoDigitalString(
    getRandomNumber(
      MocksConfig.PICTURE_NUMBER.MIN,
      MocksConfig.PICTURE_NUMBER.MAX,
    ),
  )}.jpg`,
  description: getRandomItems(
    descriptions,
    getRandomNumber(
      MocksConfig.DESCRIPTION.MIN_COUNT,
      MocksConfig.DESCRIPTION.MAX_COUNT,
    ),
  ).join(` `),
  type: getRandomItem(offerTypes),
  sum: getRandomNumber(MocksConfig.PRICE.MIN, MocksConfig.PRICE.MAX),
  category: getRandomItems(
    categories,
    getRandomNumber(MocksConfig.CATEGORY.MIN_COUNT, categories.length),
  ),
  comments: generateMockedComments({
    count: getRandomNumber(
      MocksConfig.COMMENTS.MIN_COUNT,
      MocksConfig.COMMENTS.MAX_COUNT,
    ),
    comments,
  }),
});

export { generateMockedOffer };
