import chalk, {Color} from 'chalk';

const paintMessage = (message: string, color: typeof Color) => {
  const paintedMessage = chalk[color](message);

  return paintedMessage;
};

export {paintMessage};
