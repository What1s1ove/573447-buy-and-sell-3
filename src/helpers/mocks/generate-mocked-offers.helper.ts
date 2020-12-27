import { generateMockedOffer } from '~/helpers/mocks/generate-mocked-offer.helper';
import { IOffer } from '~/common/interfaces';
import { GenerateMockedOffersCbArgs } from '~/common/types';

const generateMockedOffers = ({
  count,
  titles,
  categories,
  descriptions,
  comments,
}: GenerateMockedOffersCbArgs): IOffer[] => {
  const mockedOffers = Array.from(new Array(count), () => (
    generateMockedOffer({ titles, categories, descriptions, comments })
  ));

  return mockedOffers;
};

export { generateMockedOffers };
