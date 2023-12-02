import { NextPage } from 'next';
import { Button } from '@/shared/components/common/Button';
import { QRCode } from '@/shared/components/common/QRCode';

const Page: NextPage = () => {
  return (
    <>
      <Button>Button</Button>
      <QRCode url="https://airship.com" imageSrc="/logo.svg" size={128} />
    </>
  );
};
export default Page;
