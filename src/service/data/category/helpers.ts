import {IOffer} from '~/common/interfaces';

const getCategories = (offers: IOffer[]) => {
  const categories = offers.map((offer) => offer.type);

  return categories;
};

export {getCategories};
