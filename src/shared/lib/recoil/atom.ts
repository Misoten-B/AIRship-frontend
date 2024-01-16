import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { GlobalConfig, User } from '@/shared/types';

const { persistAtom } = recoilPersist();

export const firebaseUserState = atom<User>({
  key: 'firebaseUserState',
  default: null,
  effects: [persistAtom],
});

export const globalState = atom<GlobalConfig>({
  key: 'globalState',
  default: { dark: false },
  effects: [persistAtom],
});

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
  effects: [persistAtom],
});
