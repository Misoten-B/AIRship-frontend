'use client';

import { getAuth } from 'firebase/auth';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';
import {
  firebaseSignInWithGoogle,
  firebaseSignOut,
} from '@/shared/lib/firebase';
import {
  firebaseSignInWithEmailLink,
  sendSignInLink,
} from '@/shared/lib/firebase/firebase';
import { firebaseUserState } from '@/shared/lib/recoil';
import { emailState } from '@/shared/lib/recoil/atom';
import { User } from '@/shared/types';

type AuthContextProps = {
  token?: string;
  currentUser?: User;
  loginWithGoogle?: () => Promise<string | undefined>;
  sendSignInLinkToEmail?: (email: string) => Promise<void>;
  loginWithEmail?: () => Promise<string | undefined>;
  logout?: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({
  token: undefined,
  currentUser: undefined,
});

type Props = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: Props) => {
  const [firebaseUser, setFirebaseUser] = useRecoilState(firebaseUserState);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [email, setEmail] = useRecoilState(emailState);

  const loginWithGoogle: () => Promise<string | undefined> =
    useCallback(async () => {
      try {
        const credential = await firebaseSignInWithGoogle();
        if (!credential) return;
        const token = await getAuth().currentUser?.getIdToken();

        const cu: User = {
          displayName: credential.user.displayName,
          email: credential.user.email,
          photoURL: credential.user.photoURL,
          token: token,
        };
        setCurrentUser(cu);
        setFirebaseUser(cu);
        return token;
      } catch (error) {
        throw error;
      }
    }, [setFirebaseUser]);

  // Eメール認証
  const sendSignInLinkToEmail: (email: string) => Promise<void> = useCallback(
    async (email: string) => {
      try {
        await sendSignInLink(email);
        setEmail(email);
      } catch (error) {
        throw error;
      }
    },
    [setEmail],
  );

  // Eメールリンクログイン
  const loginWithEmail: () => Promise<string | undefined> =
    useCallback(async () => {
      try {
        const c = await firebaseSignInWithEmailLink(email);
        if (!c) return;
        const token = await getAuth().currentUser?.getIdToken();
        const cu: User = {
          displayName: c.user.displayName,
          email: c.user.email,
          photoURL: c.user.photoURL,
          token: token,
        };
        setCurrentUser(cu);
        setFirebaseUser(cu);
        setEmail('');
        return token;
      } catch (error) {
        throw error;
      }
    }, [email, setEmail, setFirebaseUser]);

  const logout = useCallback(async () => {
    try {
      await firebaseSignOut();
      setCurrentUser(null);
      setFirebaseUser(null);
      setEmail('');
    } catch (error) {
      throw error;
    }
  }, [setEmail, setFirebaseUser]);

  useEffect(() => {
    setCurrentUser(firebaseUser);
  }, [firebaseUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithGoogle,
        sendSignInLinkToEmail,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
