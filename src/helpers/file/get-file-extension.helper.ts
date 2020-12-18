import path from 'path';

const getFileExtension = (fileName: string): string => {
  const fileExtension = path.parse(fileName).name;

  return fileExtension;
};

export { getFileExtension };
