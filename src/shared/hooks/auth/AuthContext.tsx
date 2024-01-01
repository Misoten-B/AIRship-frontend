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
  firebaseSignInWithEmail,
  firebaseSignInWithGoogle,
  firebaseSignOut,
} from '@/shared/lib/firebase';
import { firebaseUserState } from '@/shared/lib/recoil';
import { User } from '@/shared/types';

type AuthContextProps = {
  token?: string;
  currentUser?: User;
  loginWithGoogle?: () => Promise<string | undefined>;
  loginWithEmailAndPassword?: (
    email: string,
    password: string,
  ) => Promise<string | undefined>;
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

  const loginWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<string | undefined> = useCallback(
    async (email: string, password: string) => {
      try {
        const credential = await firebaseSignInWithEmail(email, password);
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
    },
    [setFirebaseUser],
  );

  const logout = useCallback(async () => {
    try {
      await firebaseSignOut();
      setCurrentUser(null);
      setFirebaseUser(null);
    } catch (error) {
      throw error;
    }
  }, [setFirebaseUser]);

  useEffect(() => {
    setCurrentUser(firebaseUser);
  }, [firebaseUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithGoogle,
        loginWithEmailAndPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
