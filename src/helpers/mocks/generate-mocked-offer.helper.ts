import { getRandomItems, getRandomItem } from '~/helpers/array';
import { getRandomNumber } from '~/helpers/number';
import { generateMockedComments } from '~/helpers/mocks/generate-mocked-comments.helper';
import { getMockedImagePath } from '~/helpers/mocks/get-mocked-image-path.helper';
import { MocksConfig, OfferType } from '~/common/enums';
import { GenerateMockedOfferCbArgs, MockedOffer } from '~/common/types';

const generateMockedOffer = ({
  titles,
  descriptions,
  categories,
  comments,
  offerTypes,
}: GenerateMockedOfferCbArgs): MockedOffer => ({
  title: getRandomItem(titles),
  picture: getMockedImagePath(
    MocksConfig.OFFER_PICTURE.TYPE,
    MocksConfig.OFFER_PICTURE.NUMBER.MIN,
    MocksConfig.OFFER_PICTURE.NUMBER.MAX,
  ),
  description: getRandomItems(
    descriptions,
    getRandomNumber(
      MocksConfig.DESCRIPTION.MIN_COUNT,
      MocksConfig.DESCRIPTION.MAX_COUNT,
    ),
  ).join(` `),
  type: getRandomItem(offerTypes) as OfferType,
  sum: getRandomNumber(MocksConfig.PRICE.MIN, MocksConfig.PRICE.MAX),
  categories: getRandomItems(
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
