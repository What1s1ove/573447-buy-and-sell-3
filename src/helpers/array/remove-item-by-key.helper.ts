const removeItemByKey = <T>(items: T[], key: keyof T, value: unknown): T[] => {
  const updatedItems = items.filter((item) => item[key] !== value);

  return updatedItems;
};

export { removeItemByKey };
