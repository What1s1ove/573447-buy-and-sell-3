import packageJsonFile from '~/package.json';

const checkAppVersion = () => {
  const {version} = packageJsonFile;

  console.info(version);
};

export {checkAppVersion};
