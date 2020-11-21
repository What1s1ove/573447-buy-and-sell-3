import fs, {NoParamCallback} from 'fs';

const writeToFile = (path: string, content: string, cb: NoParamCallback) => {
  fs.writeFile(path, content, cb);
};

export {writeToFile};
