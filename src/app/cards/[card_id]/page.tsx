import { NextPage } from 'next';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page: NextPage = () => {
  return (
    <Guard>
      <GlobalNav>card detail</GlobalNav>
    </Guard>
  );
};

export default Page;
