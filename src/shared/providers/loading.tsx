import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { LoadingOverlay as MantineLoading } from '@/shared/components/common/Loader';
import { AirshipLogoColumn } from '@/shared/components/features/AirshipLogo';

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

export const useOpenLoading = () => {
  const setIsLoading = useSetRecoilState(state);

  return useCallback(() => {
    setIsLoading(true);
  }, [setIsLoading]);
};

export const useCloseLoading = () => {
  const setIsLoading = useSetRecoilState(state);

  return useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);
};

export const useLoading = () => ({
  open: useOpenLoading(),
  close: useCloseLoading(),
  toggle: useToggleLoading(),
});

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
      <AirshipLogoColumn className="spin" />
      <style>{`
        @keyframes spin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(3600deg);
          }
        }
        .spin {
          animation: spin 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
