import { getRandomItems } from '~/helpers/array';
import { getRandomNumber } from '~/helpers/number';
import { MocksConfig } from '~/common/enums';
import { GenerateMockedCommentCbArgs, CreatedComment } from '~/common/types';

const generateMockedComment = ({
  comments,
}: GenerateMockedCommentCbArgs): CreatedComment => ({
  text: getRandomItems(
    comments,
    getRandomNumber(
      MocksConfig.COMMENTS.MIN_SENTENCES_COUNT,
      MocksConfig.COMMENTS.MAX_SENTENCES_COUNT,
    ),
  ).join(` `),
});

export { generateMockedComment };
