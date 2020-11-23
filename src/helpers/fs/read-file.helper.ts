import fs from 'fs/promises';

const readFile = async (filePath: string) => {
  const content = await fs.readFile(filePath, `utf8`);

  return content;
};

export {readFile};
