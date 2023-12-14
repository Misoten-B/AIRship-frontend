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
import { firebaseUserState } from '@/shared/lib/recoil';
import { User } from '@/shared/types';

type AuthContextProps = {
  token?: string;
  currentUser?: User;
  login?: () => Promise<void>;
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

  const login = useCallback(async () => {
    try {
      const credential = await firebaseSignInWithGoogle();
      if (!credential) return;
      const token = await getAuth().currentUser?.getIdToken();
      console.debug(token);
      const cu: User = {
        displayName: credential.user.displayName,
        email: credential.user.email,
        photoURL: credential.user.photoURL,
        token: token,
      };
      setCurrentUser(cu);
      setFirebaseUser(cu);
    } catch (error) {
      console.debug(error);
    }
  }, [setFirebaseUser]);

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
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
