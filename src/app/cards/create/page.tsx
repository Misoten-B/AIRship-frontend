import { CreateCard } from './_components/CreateCard';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page = () => {
  return (
    <Guard>
      <GlobalNav>
        <CreateCard />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
