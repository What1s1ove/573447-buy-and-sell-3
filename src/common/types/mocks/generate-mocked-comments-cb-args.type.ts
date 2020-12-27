import { GenerateMockedCommentCbArgs } from '~/common/types/mocks/generate-mocked-comment-cb-args.type';

type GenerateMockedCommentsCbArgs = {
  count: number;
} & GenerateMockedCommentCbArgs;

export { GenerateMockedCommentsCbArgs };
