import { IOffer } from '~/common/interfaces';

const getCategories = (offers: IOffer[]): string[] => {
  const categories = offers.reduce<string[]>(
    (acc, offer) => [...acc, ...offer.category],
    [],
  );

  return categories;
};

export { getCategories };
