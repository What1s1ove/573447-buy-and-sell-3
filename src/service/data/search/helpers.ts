import {IOffer} from '~/common/interfaces';

const getOffersByTitleValue = (
  offers: IOffer[],
  titleValue: string
): IOffer[] => {
  const offersByTitleValue = offers.filter((offer) =>
    offer.title.includes(titleValue)
  );

  return offersByTitleValue;
};

export {getOffersByTitleValue};
