import { ModelCtor, Sequelize } from 'sequelize';
import { define as defineCategory, Category as CategoryModel } from './category/category';
// import { define as defineOfferType } from './offer-type/offer-type';
import { define as defineComment, Comment as CommentModel } from './comment/comment';
import { define as defineOffer, Offer as OfferModel } from './offer/offer';
import { define as defineOfferCategory, OfferCategory as OfferCategoryModel } from './offer-category/offer-category';
import { TableName } from '~/common/enums';

type DbModels = {
  Category: ModelCtor<CategoryModel>;
  Comment: ModelCtor<CommentModel>;
  Offer: ModelCtor<OfferModel>;
  OfferCategory: ModelCtor<OfferCategoryModel>;
};

const define = (sequelize: Sequelize): DbModels => {
  const Category = defineCategory(sequelize);
  // const OfferType = defineOfferType(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);
  const OfferCategory = defineOfferCategory(sequelize);

  // OfferType.hasMany(Offer, {
  //   as: TableName.OFFER_TYPES,
  //   foreignKey: `offerId`,
  // });

  // Offer.belongsTo(OfferType, {
  //   foreignKey: `offerId`,
  // });

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
    Comment,
    Offer,
    OfferCategory,
  };
};

export { define };
