import fs from 'fs/promises';

const writeToFile = async (path: string, content: string): Promise<void> => {
  await fs.writeFile(path, content);
};

export {writeToFile};
