import { getRandomNumber } from '~/helpers/number';
import { getTwoDigitalString } from '~/helpers/string';

const getMockedImagePath = (
  type: string,
  minImgNumber: number,
  maxImgNumber: number,
): string => {
  const mockedImagePath = `${type}${getTwoDigitalString(
    getRandomNumber(minImgNumber, maxImgNumber),
  )}.jpg`;

  return mockedImagePath;
};

export { getMockedImagePath };
