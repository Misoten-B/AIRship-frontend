import { NextPage } from 'next';
import { Cards } from './_components/Cards';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page: NextPage = () => {
  return (
    <Guard>
      <GlobalNav>
        <Cards />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
