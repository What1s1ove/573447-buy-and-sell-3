import {readFile} from '~/helpers';
import {MOCKS_FILE_PATH} from '~/common/constants';
import {IOffer} from '~/common/interfaces';

let data: IOffer[] | null = null;

const getMockedDate = async (): Promise<IOffer[]> => {
  try {
    if (data === null) {
      const fileContent = await readFile(MOCKS_FILE_PATH);

      data = JSON.parse(fileContent) as IOffer[];

      return data;
    }
  } catch (err) {
    console.log(err);

    return Promise.reject(err);
  }

  return data;
};

export {getMockedDate};
