import { ModelCtor } from 'sequelize/types';
import {
  CategoryModel as Category,
  OfferTypeModel as OfferType,
  CommentModel as Comment,
  OfferModel as Offer,
  OfferCategoryModel as OfferCategory,
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
