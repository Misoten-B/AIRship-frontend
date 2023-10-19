'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';
import { firebaseSignIn, firebaseSignOut } from '@/lib/firebase';
import { firebaseUserState } from '@/lib/recoil';
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
  const [token, setToken] = useState<string | undefined>(undefined);

  const login = useCallback(async () => {
    try {
      const credential = await firebaseSignIn();
      if (!credential) return;
      const cu = {
        displayName: credential.user.displayName,
        email: credential.user.email,
        photoURL: credential.user.photoURL,
      };
      setCurrentUser(cu);
      setToken(credential.token);
      setFirebaseUser({ token: credential.token, currentUser: cu });
    } catch (error) {
      console.debug(error);
    }
  }, [setFirebaseUser]);

  const logout = useCallback(async () => {
    try {
      await firebaseSignOut();
      setCurrentUser(null);
      setToken(undefined);
      setFirebaseUser({ token: undefined, currentUser: null });
    } catch (error) {
      throw error;
    }
  }, [setFirebaseUser]);

  useEffect(() => {
    setCurrentUser(firebaseUser?.currentUser);
    setToken(firebaseUser?.token);
  }, [firebaseUser]);

  return (
    <AuthContext.Provider value={{ token, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
