const checkIsValidByKeys = <T>(
  entity: T,
  keys: ReadonlyArray<keyof T>
): boolean => {
  const entityKeys = Object.keys(entity) as Array<keyof T>;
  const isValid = entityKeys.every((key) => keys.includes(key));

  return isValid;
};

export {checkIsValidByKeys};
