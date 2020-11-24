import fs from 'fs/promises';

const readFile = async (filePath: string) => fs.readFile(filePath, `utf8`);

export {readFile};
