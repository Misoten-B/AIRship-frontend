import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { User } from '@/shared/types';

const { persistAtom } = recoilPersist();

export const firebaseUserState = atom<{
  token: string | undefined;
  currentUser: User | undefined;
}>({
  key: 'firebaseUserState',
  default: { token: undefined, currentUser: null },
  effects: [persistAtom],
});
