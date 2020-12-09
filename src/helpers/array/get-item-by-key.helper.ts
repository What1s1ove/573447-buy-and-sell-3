const getItemByKey = <T>(
  items: T[],
  key: keyof T,
  value: unknown
): T | null => {
  const itemByKey = items.find((item) => item[key] === value);

  return itemByKey ?? null;
};

export {getItemByKey};
