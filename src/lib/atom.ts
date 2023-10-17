import { User, onAuthStateChanged } from 'firebase/auth';
import { atom } from 'recoil';
import { auth } from './firebase';

export const firebaseUserIdState = atom<string | undefined>({
  key: 'firebaseUserIdState',
  default: undefined,
  effects: [
    ({ setSelf }) => onAuthStateChanged(auth, (user) => setSelf(user?.uid)),
  ],
});

type FirebaseUser = Pick<User, 'photoURL' | 'displayName' | 'email'>;

export const firebaseUserState = atom<FirebaseUser | undefined>({
  key: 'firebaseUserState',
  default: undefined,
  effects: [
    ({ setSelf }) => {
      return onAuthStateChanged(auth, async (user) => {
        if (!user) {
          return;
        }
        const data = {
          photoURL: user.photoURL,
          displayName: user.displayName,
          email: user.email,
        };
        setSelf(data);
      });
    },
  ],
});

export const firebaseTokenState = atom<string | null>({
  key: 'firebaseTokenState',
  default: null,
  effects: [
    ({ setSelf }) => {
      return onAuthStateChanged(auth, async (user) => {
        if (!user) return;
        setSelf(await user.getIdToken());
      });
    },
  ],
});
