import { createContext, useContext, useState } from 'react';
import { LoadingOverlay as MantineLoading } from '@/shared/components/common/Loader';
import { AirshipLogo } from '@/shared/components/features/AirshipLogo';

const isLoadingContext = createContext<boolean>(false);
const toggleLoadingContext = createContext<() => void>(() => undefined);

export const useToggleLoading = () => useContext(toggleLoadingContext);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggle = () => setIsLoading((prev) => !prev);

  return (
    <isLoadingContext.Provider value={isLoading}>
      <toggleLoadingContext.Provider value={toggle}>
        <MantineLoading
          visible={isLoading}
          loaderProps={{ children: <Loading /> }}
        />
        {children}
      </toggleLoadingContext.Provider>
    </isLoadingContext.Provider>
  );
};

const Loading = () => {
  return (
    <>
      <AirshipLogo className="spin" />
      <style>{`
        @keyframes spin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
        .spin {
          animation: spin 1.5s linear infinite;
        }
      `}</style>
    </>
  );
};
