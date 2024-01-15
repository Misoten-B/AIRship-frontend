'use client';

import { useCallback, useEffect, useState } from 'react';
import { CircularProgressBar } from './CircleProgress';
import { ActionIcon, Button } from '@/shared/components/common/Button';
import { ModelViewer } from '@/shared/components/common/ModelViewer';
import { BusinessCard } from '@/shared/components/features';
import {
  IconCamera,
  IconPlayerPause,
  IconPlayerPlay,
} from '@/shared/components/icons';
import { useGetPublicBusinessCard } from '@/shared/hooks/restapi/v1/BusinessCard';
import { useLoading } from '@/shared/providers/loading';

export const CardArAssets = ({ id }: { id: string }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);
  const [duration, setDuration] = useState(0);
  const { open: openLoading, close: closeLoading } = useLoading();
  const { data, isLoading, error } = useGetPublicBusinessCard(id);

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
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <BusinessCard
        card={data}
        style={{
          left: '50%',
          position: 'absolute',
          top: '70%',
          transform: 'translate(-50%, -50%) rotateX(45deg)',
          width: '100%',
          zIndex: '-1',
        }}
      />
      <ModelViewer
        poster={''}
        glb={data.threeDimentionalModel ?? '/dog.glb'}
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
    </div>
  );
};
