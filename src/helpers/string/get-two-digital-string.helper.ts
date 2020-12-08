const TWO_DIGITAL_LENGTH = 2;
const TWO_DIGITAL_FILL_STRING = `0`;

const getTwoDigitalString = (number: number): string => {
  const twoDigitalFormatted = number
    .toString()
    .padStart(TWO_DIGITAL_LENGTH, TWO_DIGITAL_FILL_STRING);

  return twoDigitalFormatted;
};

export {getTwoDigitalString};
