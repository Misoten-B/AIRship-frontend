import { Dto_ArAssetsResponse } from '@/api/@types';

type SomeRequired<T, K extends keyof T> = T & Required<Omit<T, K>>;

export type ARAsset = SomeRequired<Dto_ArAssetsResponse, 'qrcode_image_path'>;
