import { CreateArAssetStepper } from './_components/CreateArAssetStepper';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page = () => {
  return (
    <Guard>
      <GlobalNav>
        <CreateArAssetStepper />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
