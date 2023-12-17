import { RecordedVoice } from './_components/Recorded-voice';
import { Guard } from '@/shared/components/features';
import { GlobalNav } from '@/shared/components/layouts/GlobalNav';

const Page = () => {
  return (
    <Guard>
      <GlobalNav>
        <RecordedVoice />
      </GlobalNav>
    </Guard>
  );
};

export default Page;
