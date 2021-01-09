import { CategoryDtoKey } from '~/common/enums';

interface ICategoryDto {
  [CategoryDtoKey.ID]: number;
  [CategoryDtoKey.NAME]: string;
  [CategoryDtoKey.CREATED_AT]: string;
  [CategoryDtoKey.UPDATED_AT]: string;
}

export { ICategoryDto };
