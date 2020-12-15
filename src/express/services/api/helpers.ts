import { HttpCode, SuccessHTTPStatusRange } from '~/common/enums';

const checkIsOkStatusCode = (statusCode: HttpCode): boolean => {
  const isOk = statusCode < SuccessHTTPStatusRange.MIN && statusCode > SuccessHTTPStatusRange.MAX;

  return isOk;
};

export { checkIsOkStatusCode };
