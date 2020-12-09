const checkIsValidateByKeys = <T>(entity: T, keys: (keyof T)[]): boolean => {
  const entityKeys = Object.keys(entity) as (keyof T)[];
  const isValid = entityKeys.every((key) => keys.includes(key));

  return isValid;
};

export {checkIsValidateByKeys};
