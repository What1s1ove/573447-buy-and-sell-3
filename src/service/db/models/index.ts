import Category, { define as defineCategoryModel } from './category/category';
import Comment, { define as defineCommentModel } from './comment/comment';
import Offer, { define as defineOfferModel } from './offer/offer';
import OfferCategory, { define as defineOfferCategoryModel } from './offer-category/offer-category';
import OfferType, { define as defineOfferTypeModel } from './offer-type/offer-type';

const define = {
  categoryModel: defineCategoryModel,
  commentModel: defineCommentModel,
  offerModel: defineOfferModel,
  offerCategoryModel: defineOfferCategoryModel,
  offerTypeModel: defineOfferTypeModel,
};

export { Category, Comment, Offer, OfferCategory, OfferType, define };
