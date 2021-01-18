import { CreatedOffer } from '~/common/types';

const getParsedCategories = (categories: string | string[]): number[] => {
  return Array.isArray(categories)
    ? categories.map(Number)
    : [Number(categories)];
};

const getOfferData = <T extends Record<string, unknown>>(
  body: T,
  filename?: string,
): CreatedOffer => ({
    picture: filename || null,
    sum: Number(body.sum),
    offerTypeId: Number(body.offerTypeId),
    description: body.description as string,
    title: body.title as string,
    categories: getParsedCategories(body.categories as string | string[]),
  });

export { getParsedCategories, getOfferData };
