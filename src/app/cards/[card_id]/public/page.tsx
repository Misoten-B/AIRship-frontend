import { CardArAssets } from './_components/CardArAssets';

const Page = ({ params }: { params: { card_id: string } }) => {
  return <CardArAssets id={params.card_id} />;
};

export default Page;
