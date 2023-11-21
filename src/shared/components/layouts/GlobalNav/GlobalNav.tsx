import { ReactNode } from 'react';
import { AirshipLogo, AirshipTitle } from '../../features/AirshipLogo';

type Props = {
  children: ReactNode;
};
export const GlobalNav = ({ children }: Props) => {
  return (
    <>
      <AirshipLogo />
      <AirshipTitle />
    </>
  );
};
