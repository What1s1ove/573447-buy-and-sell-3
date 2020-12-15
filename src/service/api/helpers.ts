import { readFile, logger, paintMessage } from '~/helpers';
import { MOCKS_FILE_PATH } from '~/common/constants';
import { IOffer } from '~/common/interfaces';

const data: IOffer[] = [];

const getMockedDate = async (): Promise<IOffer[]> => {
  try {
    if (!data.length) {
      const fileContent = await readFile(MOCKS_FILE_PATH);

      data.push(...(JSON.parse(fileContent) as IOffer[]));

      return data;
    }
  } catch (err) {
    logger.error(
      paintMessage(`An error occured on reading file with mocks`, `red`),
    );

    return Promise.reject(err);
  }

  return data;
};

export { getMockedDate };
