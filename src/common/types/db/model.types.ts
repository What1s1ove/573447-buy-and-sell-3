import { ModelCtor } from 'sequelize/types';
import {
  Category,
  OfferType,
  Comment,
  Offer,
  OfferCategory,
} from '~/service/db/models';

type CategoryModel = ModelCtor<Category>;
type OfferTypeModel = ModelCtor<OfferType>;
type CommentModel = ModelCtor<Comment>;
type OfferModel = ModelCtor<Offer>;
type OfferCategoryModel = ModelCtor<OfferCategory>;

export {
  CategoryModel,
  OfferTypeModel,
  CommentModel,
  OfferModel,
  OfferCategoryModel,
};
