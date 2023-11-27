import { User as FirebaseUser } from 'firebase/auth';

/**
 * null → 非ログインユーザ
 */
export type User =
  | (Pick<FirebaseUser, 'photoURL' | 'displayName' | 'email'> & {
      token?: string;
    })
  | null;
