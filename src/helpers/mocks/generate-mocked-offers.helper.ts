import { generateMockedOffer } from '~/helpers/mocks/generate-mocked-offer.helper';
import { GenerateMockedOffersCbArgs, MockedOffer } from '~/common/types';

const generateMockedOffers = ({
  count,
  titles,
  categories,
  descriptions,
  comments,
  users,
}: GenerateMockedOffersCbArgs): MockedOffer[] => {
  const mockedOffers = Array.from(new Array(count), () => (
    generateMockedOffer({ titles, categories, descriptions, comments, users })
  ));

  return mockedOffers;
};

export { generateMockedOffers };
