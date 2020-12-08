import {
  paintMessage,
  writeToFile,
  readFile,
  getRandomItem,
  getTwoDigitalString,
  getRandomNumber,
  getRandomItems,
  getRandomId,
} from '~/helpers';
import {CliExitCode, OfferType} from '~/common/enums';
import {IOffer, IComment} from '~/common/interfaces';
import {
  GenerateMockedCommentCbArgs,
  GenerateMockedCommentsCbArgs,
  GenerateMockedOfferCbArgs,
  GenerateMockedOffersCbArgs,
  MocksConfig,
} from './common';

const offerTypes = Object.values(OfferType);

const generateMockedComment = ({
  comments,
}: GenerateMockedCommentCbArgs): IComment => ({
  id: getRandomId(),
  text: getRandomItems(
    comments,
    getRandomNumber(
      MocksConfig.COMMENTS.MIN_SENTENCES_COUNT,
      MocksConfig.COMMENTS.MAX_SENTENCES_COUNT
    )
  ).join(` `),
});

const generateMockedComments = ({
  count,
  comments,
}: GenerateMockedCommentsCbArgs): IComment[] => {
  const mockedComments = Array.from(new Array(count), () =>
    generateMockedComment({comments})
  );

  return mockedComments;
};

const generateMockedOffer = ({
  titles,
  descriptions,
  categories,
  comments
}: GenerateMockedOfferCbArgs): IOffer => ({
  id: getRandomId(),
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
  comments: generateMockedComments({
    count: getRandomNumber(
      MocksConfig.COMMENTS.MIN_COUNT,
      MocksConfig.COMMENTS.MAX_COUNT
    ),
    comments
  }),
});

const generateMockedOffers = ({
  count,
  titles,
  categories,
  descriptions,
  comments,
}: GenerateMockedOffersCbArgs): IOffer[] => {
  const mockedOffers = Array.from(new Array(count), () =>
    generateMockedOffer({titles, categories, descriptions, comments})
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
  const descriptions = await readOfferFileContent(MocksConfig.DESCRIPTION.FILE_PATH);
  const categories = await readOfferFileContent(MocksConfig.CATEGORY.FILE_PATH);
  const comments = await readOfferFileContent(MocksConfig.COMMENTS.FILE_PATH);

  return {
    titles,
    descriptions,
    categories,
    comments,
  };
};

export {
  generateMockedOffer,
  generateMockedOffers,
  saveOffersToFile,
  readOfferFileContent,
  getOffersData,
};
