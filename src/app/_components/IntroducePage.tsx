import { Footer } from './Footer/Footer';
import { Overview } from './Overview/Overview';
import { QRCodeSample } from './QRCodeSample/QRCodeSample';
import { UsageSection } from './UsageSection/UsageSection';

export const IntroducePage = () => {
  return (
    <>
      <Overview />
      <UsageSection />
      <QRCodeSample />
      <Footer />
    </>
  );
};
