const removeItemByKey = <T>(items: T[], key: keyof T, value: unknown): T[] => {
  const updatedOffers = items.filter((item) => item[key] !== value);

  return updatedOffers;
};

export {removeItemByKey};
