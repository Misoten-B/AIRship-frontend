import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { User } from '@/shared/types';

const { persistAtom } = recoilPersist();

export const firebaseUserState = atom<User>({
  key: 'firebaseUserState',
  default: null,
  effects: [persistAtom],
});
