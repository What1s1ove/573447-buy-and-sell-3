import {paintMessage, writeToFile, readFile} from '~/helpers';
import {CliExitCode} from '~/common/enums';
import {IOffer} from '~/common/interfaces';
import {MocksConfig} from './common';

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

  return {
    titles,
    descriptions,
    categories,
  };
};

export {saveOffersToFile, readOfferFileContent, getOffersData};
