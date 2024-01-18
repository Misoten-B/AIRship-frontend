import { CardPage } from './_components/CardPage';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page = ({ params }: { params: { card_id: string } }) => {
  return (
    <Guard>
      <GlobalNav>
        <CardPage card_id={params.card_id} />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
