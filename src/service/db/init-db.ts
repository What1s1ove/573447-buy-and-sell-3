import { Sequelize } from 'sequelize';
import { TableName } from '~/common/enums';
import { MockedOffer } from '~/common/types';
import { define as defineModels } from './models/models';

type MockedPayload = {
  categories: string[];
  offers: MockedOffer[];
};

const initDb = async (
  sequelize: Sequelize,
  { categories, offers }: MockedPayload,
): Promise<void> => {
  const { Category, Offer } = defineModels(sequelize);
  await sequelize.sync({
    force: true,
  });

  const categoryModels = await Category.bulkCreate(
    categories.map((item) => ({
      name: item,
    })),
  );

  const categoryIdByName = categoryModels.reduce(
    (acc, next) => ({
      [next.name]: next.id,
      ...acc,
    }),
    {},
  );

  const offerPromises = offers.map(async (offer) => {
    const offerModel = await Offer.create(offer, {
      include: [TableName.COMMENTS],
    });

    await offerModel.addCategories(
      offer.categories.map((name) => categoryIdByName[name]),
    );
  });

  await Promise.all(offerPromises);
};

export { initDb };
