import { atom } from 'recoil';

export const recoilScaleState = atom<number>({
  key: 'recoilScaleState',
  default: 1,
});
