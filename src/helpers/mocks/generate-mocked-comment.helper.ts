import { getRandomId } from '~/helpers/string';
import { getRandomItems } from '~/helpers/array';
import { getRandomNumber } from '~/helpers/number';
import { MocksConfig } from '~/common/enums';
import { IComment } from '~/common/interfaces';
import { GenerateMockedCommentCbArgs } from '~/common/types';

const generateMockedComment = ({
  comments,
}: GenerateMockedCommentCbArgs): IComment => ({
  id: getRandomId(),
  text: getRandomItems(
    comments,
    getRandomNumber(
      MocksConfig.COMMENTS.MIN_SENTENCES_COUNT,
      MocksConfig.COMMENTS.MAX_SENTENCES_COUNT,
    ),
  ).join(` `),
});

export { generateMockedComment };
