import { ROUTES } from '@/shared/constants';

// getQRCodeUrlはARアセットのIDをもとにQRコードのURLを生成する関数です。
export const getQRCodeUrl = (arAssetId: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://airship.azurewebsites.net';
  const path = ROUTES.arAssets.public(arAssetId);

  return `${baseUrl}${path}`;
};

// getPublicCardUrlはユーザーIDをもとに名刺のURLを生成する関数です。
// 本番が近いため、上記関数とのリファクタリングは行っていません。
export const getPublicCardUrl = (userId: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://airship.azurewebsites.net';
  const path = ROUTES.cards.public(userId);

  return `${baseUrl}${path}`;
};

// 本番が近いため、上記関数とのリファクタリングは行っていません。
export const qrBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://airship.azurewebsites.net';
