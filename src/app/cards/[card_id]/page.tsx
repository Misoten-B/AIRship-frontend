import { NextPage } from 'next';
import { Guard } from '@/shared/components/guards';

const Page: NextPage = () => {
  return <Guard>card detail</Guard>;
};

export default Page;
