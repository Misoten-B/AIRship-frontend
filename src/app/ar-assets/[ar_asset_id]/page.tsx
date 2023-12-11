import { NextPage } from 'next';
import { ArAssetDetail } from './_components/ArAssetDetail';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page: NextPage = () => {
  return (
    <Guard>
      <GlobalNav>
        <ArAssetDetail />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
