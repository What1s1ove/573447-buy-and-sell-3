const getUniqueItems = <T>(items: T[]): T[] => {
  const uniqueItems = Array.from(new Set(items));

  return uniqueItems;
};

export { getUniqueItems };
