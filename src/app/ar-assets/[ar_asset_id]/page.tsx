import { ArAssetDetail } from './_components/ArAssetDetail';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page = ({ params }: { params: { ar_asset_id: string } }) => {
  return (
    <Guard>
      <GlobalNav>
        <ArAssetDetail id={params.ar_asset_id} />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
