import { NextPage } from 'next';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page: NextPage = () => {
  return (
    <Guard>
      <GlobalNav>
        <p>録音するページ</p>
      </GlobalNav>
    </Guard>
  );
};

export default Page;
