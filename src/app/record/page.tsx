import { NextPage } from 'next';
import { RecordPage } from './_components/RecordPage';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page: NextPage = () => {
  return (
    <Guard>
      <GlobalNav>
        <RecordPage />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
