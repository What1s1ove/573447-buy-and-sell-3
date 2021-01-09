import { Sequelize } from 'sequelize';
import { CommentDtoKey, OfferDtoKey, TableName } from '~/common/enums';
import { DbModels } from '~/common/types';
import { define } from './models';


const defineModels = (sequelize: Sequelize): DbModels => {
  const Category = define.categoryModel(sequelize);
  const OfferType = define.offerTypeModel(sequelize);
  const Comment = define.commentModel(sequelize);
  const Offer = define.offerModel(sequelize);
  const OfferCategory = define.offerCategoryModel(sequelize);

  Offer.belongsTo(OfferType, {
    foreignKey: OfferDtoKey.OFFER_TYPE_ID,
    as: TableName.OFFER_TYPES,
  });

  Offer.hasMany(Comment, {
    foreignKey: CommentDtoKey.OFFER_ID,
    as: TableName.COMMENTS,
  });

  Comment.belongsTo(Offer, {
    foreignKey: CommentDtoKey.OFFER_ID,
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

export { defineModels };
