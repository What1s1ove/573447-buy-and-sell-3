const checkIsValidByKeys = <T>(
  entity: T,
  keys: ReadonlyArray<keyof T> | Array<keyof T>,
): boolean => {
  const entityKeys = Object.keys(entity) as Array<keyof T>;
  const isValid = keys.every((key) => entityKeys.includes(key));

  return isValid;
};

export { checkIsValidByKeys };
