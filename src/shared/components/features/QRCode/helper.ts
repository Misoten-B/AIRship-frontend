import { ROUTES } from '@/shared/constants';

// getQRCodeUrlはARアセットのIDをもとにQRコードのURLを生成する関数です。
export const getQRCodeUrl = (arAssetId: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://airship.azurewebsites.net';
  const path = ROUTES.arAssets.public(arAssetId);

  return `${baseUrl}${path}`;
};
