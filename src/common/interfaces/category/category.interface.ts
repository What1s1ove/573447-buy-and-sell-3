import { CategoryKey } from '~/common/enums';

interface ICategory {
  [CategoryKey.ID]: number;
  [CategoryKey.NAME]: string;
  [CategoryKey.CREATED_AT]: string;
  [CategoryKey.UPDATED_AT]: string;
}

export { ICategory };
