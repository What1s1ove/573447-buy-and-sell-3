import { ModelCtor, Sequelize } from 'sequelize';
import { define as defineCategory, Category as CategoryModel } from './category/category';
import { define as defineOfferType, OfferType as OfferTypeModel } from './offer-type/offer-type';
import { define as defineComment, Comment as CommentModel } from './comment/comment';
import { define as defineOffer, Offer as OfferModel } from './offer/offer';
import { define as defineOfferCategory, OfferCategory as OfferCategoryModel } from './offer-category/offer-category';
import { TableName } from '~/common/enums';

type DbModels = {
  Category: ModelCtor<CategoryModel>;
  Comment: ModelCtor<CommentModel>;
  Offer: ModelCtor<OfferModel>;
  OfferCategory: ModelCtor<OfferCategoryModel>;
  OfferType: ModelCtor<OfferTypeModel>;
};

const define = (sequelize: Sequelize): DbModels => {
  const Category = defineCategory(sequelize);
  const OfferType = defineOfferType(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);
  const OfferCategory = defineOfferCategory(sequelize);

  Offer.belongsTo(OfferType, {
    foreignKey: `offerTypeId`,
    as: TableName.OFFER_TYPES,
  });

  Offer.hasMany(Comment, {
    as: TableName.COMMENTS,
    foreignKey: `offerId`,
  });

  Comment.belongsTo(Offer, {
    foreignKey: `offerId`,
  });

  Offer.belongsToMany(Category, {
    through: OfferCategory,
    as: TableName.CATEGORIES,
  });

  Category.belongsToMany(Offer, {
    through: OfferCategory,
    as: TableName.OFFERS,
  });

  Category.hasMany(OfferCategory, {
    as: TableName.OFFERS_CATEGORIES,
  });

  return {
    Category,
    OfferType,
    Comment,
    Offer,
    OfferCategory,
  };
};

export { define };
