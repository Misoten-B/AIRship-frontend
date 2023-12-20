'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
