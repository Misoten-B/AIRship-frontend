'use client';

import { useCallback } from 'react';
import { Button } from '@/shared/components/common/Button';
import { Loader } from '@/shared/components/common/Loader';
import { ModelViewer } from '@/shared/components/common/ModelViewer';
import { IconPlayerPlay } from '@/shared/components/icons';
import { useGetPublicArAsset } from '@/shared/hooks/restapi/v1/ArAssets';

export const ArAssets = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetPublicArAsset(id);

  const playVoice = useCallback(() => {
    const audioPath = data?.speakingAudioPath;
    if (!audioPath) return;

    const audio = new Audio(audioPath);
    audio.play();
  }, [data]);

  if (isLoading) return <Loader />;
  if (error) return <div>falied to fetch</div>;
  if (!data) return null;

  return (
    <ModelViewer
      poster={''}
      glb={data.threeDimentionalPath ?? '/dog.glb'}
      alt={''}
      height="100%"
      ar
      arMode="webxr"
      cameraControl
      style={{ width: '100%', height: '100%' }}
    >
      <>
        <Button
          slot="ar-button"
          pos="absolute"
          bottom={16}
          left="50%"
          style={{ transform: 'translateX(-50%)' }}
        >
          ARで見る
        </Button>
        <Button
          pos="absolute"
          bottom={16}
          right={0}
          color="orange.6"
          style={{
            transform: 'translateX(-50%)',
          }}
          leftSection={<IconPlayerPlay />}
          onClick={playVoice}
        >
          再生
        </Button>
      </>
    </ModelViewer>
  );
};
