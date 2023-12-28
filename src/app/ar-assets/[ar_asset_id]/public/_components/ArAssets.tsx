'use client';

import { useCallback, useEffect, useState } from 'react';
import { CircularProgressBar } from './CircleProgress';
import { ActionIcon, Button } from '@/shared/components/common/Button';
import { ModelViewer } from '@/shared/components/common/ModelViewer';
import {
  IconCamera,
  IconPlayerPause,
  IconPlayerPlay,
} from '@/shared/components/icons';
import { useGetPublicArAsset } from '@/shared/hooks/restapi/v1/ArAssets';
import { useLoading } from '@/shared/providers/loading';

export const ArAssets = ({ id }: { id: string }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);
  const [duration, setDuration] = useState(0);
  const { data, isLoading, error } = useGetPublicArAsset(id);
  const { open: openLoading, close: closeLoading } = useLoading();

  const togglePlay = useCallback(() => {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [audio]);

  useEffect(() => {
    if (!data) return;
    if (data.speakingAudioPath) {
      const newAudio = new Audio(data.speakingAudioPath);
      newAudio.addEventListener('loadedmetadata', () => {
        setDuration(newAudio.duration);
      });
      newAudio.addEventListener('timeupdate', () => {
        const cuProgress = (newAudio.currentTime / newAudio.duration) * 100;
        if (cuProgress > 0) setProgress((prev) => [...prev, cuProgress]);
        if (cuProgress === 100) {
          setProgress([]);
          setIsPlaying(false);
        }
      });
      setAudio(newAudio);
    }
  }, [data]);

  if (isLoading) openLoading();
  if (!isLoading) closeLoading();
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
          variant="gradient"
          style={{ transform: 'translateX(-50%)' }}
          leftSection={<IconCamera />}
        >
          ARで見る
        </Button>
        <ActionIcon
          pos="absolute"
          bottom={16}
          right={0}
          color="orange.6"
          style={{
            transform: 'translateX(-50%)',
          }}
          radius="xl"
          variant="gradient"
          size="xl"
          onClick={togglePlay}
        >
          {isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />}
          <CircularProgressBar
            progress={progress}
            duration={duration}
            style={{ position: 'absolute' }}
          />
        </ActionIcon>
      </>
    </ModelViewer>
  );
};
