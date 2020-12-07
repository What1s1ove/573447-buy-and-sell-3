import {readFile} from '~/helpers';
import {IOffer} from '~/common/interfaces';
import {MOCKS_FILE_PATH} from '~/common/constants';

const getMocks = async (): Promise<IOffer[] | never> => {
  const fileContent = await readFile(MOCKS_FILE_PATH);

  const mocks = JSON.parse(fileContent);

  return mocks;
};

export {getMocks};
