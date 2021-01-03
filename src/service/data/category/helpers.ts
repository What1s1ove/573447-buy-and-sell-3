import { IOffer } from '~/common/interfaces';

const getCategories = (offers: IOffer[]): string[] => {
  const categories = offers.reduce<string[]>(
    (acc, offer) => [...acc, ...offer.categories],
    [],
  );

  return categories;
};

export { getCategories };
