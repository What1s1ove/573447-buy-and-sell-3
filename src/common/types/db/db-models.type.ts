import { ModelName } from '~/common/enums';
import {
  CommentModel,
  CategoryModel,
  OfferModel,
  OfferCategoryModel,
  OfferTypeModel,
  UserModel,
} from '~/common/types/db/model.types';

type DbModels = {
  [ModelName.CATEGORY]: CategoryModel;
  [ModelName.COMMENT]: CommentModel;
  [ModelName.OFFER]: OfferModel;
  [ModelName.OFFER_CATEGORY]: OfferCategoryModel;
  [ModelName.OFFER_TYPE]: OfferTypeModel;
  [ModelName.USER]: UserModel;
};

export { DbModels };
