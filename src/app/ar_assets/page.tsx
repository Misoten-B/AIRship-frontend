import { NextPage } from 'next';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page: NextPage = () => {
  return (
    <Guard>
      <GlobalNav>ar_asset</GlobalNav>
    </Guard>
  );
};

export default Page;
