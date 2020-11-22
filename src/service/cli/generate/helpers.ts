import {paintMessage, writeToFile} from '~/helpers';
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

export {saveOffersToFile};
