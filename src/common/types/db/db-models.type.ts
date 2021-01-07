import {
  CommentModel,
  CategoryModel,
  OfferModel,
  OfferCategoryModel,
  OfferTypeModel,
} from '~/common/types/db/model.types';

type DbModels = {
  Category: CategoryModel;
  Comment: CommentModel;
  Offer: OfferModel;
  OfferCategory: OfferCategoryModel;
  OfferType: OfferTypeModel;
};

export { DbModels };
