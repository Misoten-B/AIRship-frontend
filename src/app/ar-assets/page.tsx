import { NextPage } from 'next';
import { ArAssetsPage } from './_components/ArAssetsPage';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page: NextPage = () => {
  return (
    <Guard>
      <GlobalNav>
        <ArAssetsPage />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
