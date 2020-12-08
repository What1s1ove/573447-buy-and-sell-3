import chalk, {Color} from 'chalk';

const paintMessage = (message: string, color: typeof Color): string => {
  const paintedMessage = chalk[color](message);

  return paintedMessage;
};

export {paintMessage};
