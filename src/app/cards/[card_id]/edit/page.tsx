import { EditCard } from './_components/EditCard';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const page = ({ params }: { params: { card_id: string } }) => {
  return (
    <Guard>
      <GlobalNav>
        <EditCard id={params.card_id} />
      </GlobalNav>
    </Guard>
  );
};

export default page;
