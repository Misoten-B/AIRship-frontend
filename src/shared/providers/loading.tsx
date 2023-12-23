import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { LoadingOverlay as MantineLoading } from '@/shared/components/common/Loader';
import { AirshipLogo } from '@/shared/components/features/AirshipLogo';

const state = atom<boolean>({
  key: 'loading',
  default: false,
});

const useIsLoading = () => useRecoilValue(state);

export const useToggleLoading = () => {
  const setIsLoading = useSetRecoilState(state);

  return useCallback(() => {
    setIsLoading((prev) => !prev);
  }, [setIsLoading]);
};

export const LoadingProvider = () => {
  const isLoading = useIsLoading();

  return (
    <MantineLoading
      visible={isLoading}
      loaderProps={{ children: <CustomLoader /> }}
    />
  );
};

const CustomLoader = () => {
  return (
    <>
      <AirshipLogo className="spin" />
      <style>{`
        @keyframes spin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(1080deg);
          }
        }
        .spin {
          animation: spin 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
