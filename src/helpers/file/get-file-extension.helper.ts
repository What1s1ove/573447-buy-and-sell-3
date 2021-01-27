const FILE_EXTENSION_SEPARATOR = `.`;

const getFileExtension = (fileName: string): string => {
  const fileExtension = fileName
    .split(FILE_EXTENSION_SEPARATOR)
    .pop() as string;

  return fileExtension;
};

export { getFileExtension };
