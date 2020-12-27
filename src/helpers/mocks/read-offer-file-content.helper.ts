import { logger } from '~/helpers/log';
import { paintMessage } from '~/helpers/string';
import { readFile } from '~/helpers/fs';

const readOfferFileContent = async (path: string): Promise<string[]> => {
  try {
    const content = await readFile(path);

    return content.trim().split(`\n`);
  } catch {
    logger.error(
      paintMessage(
        `An error occurred on reading mocked-data: can't read mocked-data from file...`,
        `red`,
      ),
    );

    return [];
  }
};

export { readOfferFileContent };
