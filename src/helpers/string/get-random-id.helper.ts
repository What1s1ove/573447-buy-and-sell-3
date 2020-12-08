import {nanoid} from 'nanoid';

const DEFAULT_ID_LENGTH = 6;

const getRandomId = (size: number = DEFAULT_ID_LENGTH) => {
  const randomId = nanoid(size);

  return randomId;
};

export {getRandomId};
