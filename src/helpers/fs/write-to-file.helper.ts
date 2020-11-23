import fs from 'fs/promises';

const writeToFile = async (path: string, content: string) => {
  await fs.writeFile(path, content);
};

export {writeToFile};
