import { CreatedUserPayload } from '~/common/types';

const getRegisterData = <T extends Record<string, unknown>>(
  body: T,
  filename: string,
): CreatedUserPayload => ({
    email: body.email as string,
    password: body.password as string,
    repeatedPassword: body.repeatedPassword as string,
    firstName: body.firstName as string,
    lastName: body.lastName as string,
    avatar: filename as string,
  });

export { getRegisterData };
