import { NextPage } from 'next';
import { CardPage } from './_components/CardPage';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page: NextPage = () => {
  return (
    <Guard>
      <GlobalNav>
        <CardPage />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
