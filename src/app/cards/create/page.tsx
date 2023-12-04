import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page = () => {
  return (
    <Guard>
      <GlobalNav>create card</GlobalNav>
    </Guard>
  );
};

export default Page;
