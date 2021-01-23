import multer, { diskStorage, StorageEngine, Multer } from 'multer';
import { getRandomId, getFileExtension } from '~/helpers';

type Constructor = {
  destination: string;
};

class DiskStorage {
  #storage: StorageEngine;

  constructor({ destination }: Constructor) {
    this.#storage = diskStorage({
      destination,
      filename: (_, file, cb) => {
        const uniqueName = getRandomId();
        const extension = getFileExtension(file.originalname);

        cb(null, `${uniqueName}.${extension}`);
      },
    });
  }

  get upload(): Multer {
    return multer({
      storage: this.#storage,
    });
  }
}

export default DiskStorage;
