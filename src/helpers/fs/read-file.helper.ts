import fs from 'fs/promises';

const readFile = async (filePath: string): Promise<string> => {
  return fs.readFile(filePath, `utf8`);
};

export { readFile };
