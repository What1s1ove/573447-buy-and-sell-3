import { Session, SessionData } from 'express-session';

type SessionRequest = Session & Partial<SessionData> & Record<string, unknown>;

export { SessionRequest };
