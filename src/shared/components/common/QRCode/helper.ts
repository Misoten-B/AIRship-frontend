import { ROUTES } from '@/shared/constants';

export const getQRCodeUrl = (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const path = ROUTES.arAssets.public(id);

  return `${baseUrl}${path}`;
};
