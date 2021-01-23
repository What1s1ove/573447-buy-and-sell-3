import { ModelName } from '~/common/enums';
import Category, { define as defineCategoryModel } from './category/category';
import Comment, { define as defineCommentModel } from './comment/comment';
import Offer, { define as defineOfferModel } from './offer/offer';
import OfferCategory, { define as defineOfferCategoryModel } from './offer-category/offer-category';
import OfferType, { define as defineOfferTypeModel } from './offer-type/offer-type';
import User, { define as defineUserModel } from './user/user';

const define = {
  [ModelName.CATEGORY]: defineCategoryModel,
  [ModelName.COMMENT]: defineCommentModel,
  [ModelName.OFFER]: defineOfferModel,
  [ModelName.OFFER_CATEGORY]: defineOfferCategoryModel,
  [ModelName.OFFER_TYPE]: defineOfferTypeModel,
  [ModelName.USER]: defineUserModel,
};

export { Category, Comment, Offer, OfferCategory, OfferType, User, define };
