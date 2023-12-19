import { CreateArAssetPage } from './_components/CreateArAssetStepper';
import { RequestBodiesProvider } from './_components/RequestBodiesProvider';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page = () => {
  return (
    <Guard>
      <GlobalNav>
        <RequestBodiesProvider>
          <CreateArAssetPage />
        </RequestBodiesProvider>
      </GlobalNav>
    </Guard>
  );
};

export default Page;
