import { generateMockedComment } from '~/helpers/mocks/generate-mocked-comment.helper';
import { IComment } from '~/common/interfaces';
import { GenerateMockedCommentsCbArgs } from '~/common/types';

const generateMockedComments = ({
  count,
  comments,
}: GenerateMockedCommentsCbArgs): IComment[] => {
  const mockedComments = Array.from(new Array(count), () => (
    generateMockedComment({ comments })
  ));

  return mockedComments;
};

export { generateMockedComments };
