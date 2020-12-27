import { paintMessage, writeToFile, logger } from '~/helpers';
import { MocksConfig } from '~/common/enums';
import { IOffer } from '~/common/interfaces';

const saveOffersToFile = async (mockedOffers: IOffer[]): Promise<void> => {
  try {
    await writeToFile(MocksConfig.FILE_NAME, JSON.stringify(mockedOffers));

    logger.info(
      paintMessage(`Operation success. File with mocks was created.`, `green`),
    );
  } catch {
    logger.error(
      paintMessage(
        `An error occurred on saving mocked-data: can't write mocked-data to file...`,
        `red`,
      ),
    );
  }
};

export { saveOffersToFile };
