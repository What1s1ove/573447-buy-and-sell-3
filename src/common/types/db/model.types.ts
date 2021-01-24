import { ModelCtor } from 'sequelize/types';
import {
  Category,
  OfferType,
  Comment,
  Offer,
  OfferCategory,
  User,
  Session,
} from '~/db/models';

type CategoryModel = ModelCtor<Category>;
type OfferTypeModel = ModelCtor<OfferType>;
type CommentModel = ModelCtor<Comment>;
type OfferModel = ModelCtor<Offer>;
type OfferCategoryModel = ModelCtor<OfferCategory>;
type UserModel = ModelCtor<User>;
type SessionModel = ModelCtor<Session>;

export {
  CategoryModel,
  OfferTypeModel,
  CommentModel,
  OfferModel,
  OfferCategoryModel,
  UserModel,
  SessionModel,
};
