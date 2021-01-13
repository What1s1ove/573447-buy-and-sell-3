import { Sequelize } from 'sequelize';
import { CommentDtoKey, ModelAlias, OfferDtoKey } from '~/common/enums';
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
    as: ModelAlias.OFFER_TYPES,
  });

  Offer.hasMany(Comment, {
    foreignKey: CommentDtoKey.OFFER_ID,
    as: ModelAlias.COMMENTS,
  });

  Comment.belongsTo(Offer, {
    foreignKey: CommentDtoKey.OFFER_ID,
  });

  Offer.belongsToMany(Category, {
    through: OfferCategory,
    as: ModelAlias.CATEGORIES,
  });

  Category.belongsToMany(Offer, {
    through: OfferCategory,
    as: ModelAlias.OFFERS,
  });

  Category.hasMany(OfferCategory, {
    as: ModelAlias.OFFER_CATEGORIES,
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
