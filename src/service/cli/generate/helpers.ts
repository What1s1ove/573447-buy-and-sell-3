import {nanoid} from 'nanoid';
import {
  paintMessage,
  writeToFile,
  readFile,
  getRandomItem,
  getTwoDigitalString,
  getRandomNumber,
  getRandomItems,
} from '~/helpers';
import {CliExitCode, OfferType} from '~/common/enums';
import {IOffer} from '~/common/interfaces';
import { MAX_ID_LENGTH } from '~/common/constants';
import {
  GenerateMockedOfferCbArgs,
  GenerateMockedOffersCbArgs,
  MocksConfig,
} from './common';

const offerTypes = Object.values(OfferType);

const generateMockedOffer = ({
  titles,
  descriptions,
  categories,
}: GenerateMockedOfferCbArgs): IOffer => ({
  id: nanoid(MAX_ID_LENGTH),
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

const generateMockedOffers = ({
  count,
  titles,
  categories,
  descriptions,
}: GenerateMockedOffersCbArgs): IOffer[] => {
  const mockedOffers = Array.from(new Array(count), () =>
    generateMockedOffer({titles, categories, descriptions})
  );

  return mockedOffers;
};

const saveOffersToFile = async (mockedOffers: IOffer[]) => {
  try {
    await writeToFile(MocksConfig.FILE_NAME, JSON.stringify(mockedOffers));

    console.log(paintMessage(`Operation success. File created.`, `green`));
  } catch {
    console.error(paintMessage(`Can't write data to file...`, `red`));

    process.exit(CliExitCode.ERROR);
  }
};

const readOfferFileContent = async (path: string) => {
  try {
    const content = await readFile(path);

    return content.trim().split(`\n`);
  } catch (err) {
    console.error(paintMessage(err, `red`));

    return [];
  }
};

const getOffersData = async () => {
  const titles = await readOfferFileContent(MocksConfig.TITLE.FILE_PATH);
  const descriptions = await readOfferFileContent(
    MocksConfig.DESCRIPTION.FILE_PATH
  );
  const categories = await readOfferFileContent(MocksConfig.CATEGORY.FILE_PATH);

  return {
    titles,
    descriptions,
    categories,
  };
};

export {
  generateMockedOffer,
  generateMockedOffers,
  saveOffersToFile,
  readOfferFileContent,
  getOffersData,
};
