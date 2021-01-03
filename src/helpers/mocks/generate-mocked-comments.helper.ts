import { generateMockedComment } from '~/helpers/mocks/generate-mocked-comment.helper';
import { CreatedComment, GenerateMockedCommentsCbArgs } from '~/common/types';

const generateMockedComments = ({
  count,
  comments,
}: GenerateMockedCommentsCbArgs): CreatedComment[] => {
  const mockedComments = Array.from(new Array(count), () => (
    generateMockedComment({ comments })
  ));

  return mockedComments;
};

export { generateMockedComments };
