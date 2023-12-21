import { ArAssets } from './_components/ArAssets';

const Page = ({ params }: { params: { ar_asset_id: string } }) => {
  return <ArAssets id={params.ar_asset_id} />;
};

export default Page;
