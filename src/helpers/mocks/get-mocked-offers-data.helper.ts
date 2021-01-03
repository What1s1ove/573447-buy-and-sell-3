import { MocksConfig, OfferType } from '~/common/enums';
import { GenerateMockedOfferCbArgs } from '~/common/types';
import { readOfferFileContent } from '~/helpers/mocks/read-offer-file-content.helper';

const offerTypes = Object.values(OfferType);

const dataPaths = [
  MocksConfig.TITLE.FILE_PATH,
  MocksConfig.DESCRIPTION.FILE_PATH,
  MocksConfig.CATEGORY.FILE_PATH,
  MocksConfig.COMMENTS.FILE_PATH,
  MocksConfig.USERS.FILE_PATH,
];

const getMockedOffersData = async (): Promise<GenerateMockedOfferCbArgs> => {
  const [titles, descriptions, categories, comments, users] = await Promise.all(
    dataPaths.map((path) => readOfferFileContent(path)),
  );

  return {
    titles,
    descriptions,
    categories,
    comments,
    users,
    offerTypes,
  };
};

export { getMockedOffersData };
