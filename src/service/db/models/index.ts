import CategoryModel, { define as defineCategoryModel } from './category/category';
import CommentModel, { define as defineCommentModel } from './comment/comment';
import OfferModel, { define as defineOfferModel } from './offer/offer';
import OfferCategoryModel, { define as defineOfferCategoryModel } from './offer-category/offer-category';
import OfferTypeModel, { define as defineOfferTypeModel } from './offer-type/offer-type';

const define = {
  categoryModel: defineCategoryModel,
  commentModel: defineCommentModel,
  offerModel: defineOfferModel,
  offerCategoryModel: defineOfferCategoryModel,
  offerTypeModel: defineOfferTypeModel,
};

export {
  CategoryModel,
  CommentModel,
  OfferModel,
  OfferCategoryModel,
  OfferTypeModel,
  define,
};
