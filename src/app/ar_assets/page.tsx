import { NextPage } from 'next';
import { ArAssetList } from './_components/ArAssetList';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page: NextPage = () => {
  return (
    <Guard>
      <GlobalNav>
        <ArAssetList />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
