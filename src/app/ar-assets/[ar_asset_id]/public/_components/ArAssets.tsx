'use client';

import { Button } from '@/shared/components/common/Button';
import { ModelViewer } from '@/shared/components/common/ModelViewer';
import { IconPlayerPlay } from '@/shared/components/icons';

export const ArAssets = () => {
  const voicePath = '/ktok_test.wav';

  const playVoice = () => {
    const audio = new Audio(voicePath);
    audio.play();
  };

  return (
    <ModelViewer
      poster={''}
      glb={'/dog.glb'}
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
