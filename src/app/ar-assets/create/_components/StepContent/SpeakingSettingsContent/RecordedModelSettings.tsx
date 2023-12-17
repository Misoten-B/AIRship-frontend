'use client';

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useEffect, useRef } from 'react';
import { ActionIcon, Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { IconMicrophone } from '@/shared/components/icons/IconMicrophone';
import { useAudioRecorder } from '@/shared/hooks/useAudioRecorder';

const MAX_RECORDING_TIME = 10;

export const RecordedModelSettings = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const ffmpegRef = useRef(new FFmpeg());

  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    recordingBlob,
  } = useAudioRecorder();

  useEffect(() => {
    if (!isRecording) return;
    if (recordingTime <= MAX_RECORDING_TIME) return;

    stopRecording();
  }, [isRecording, recordingTime, stopRecording]);

  useEffect(() => {
    if (!recordingBlob) return;

    (async () => {
      // FFmpegのセットアップ
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';
      const ffmpeg = ffmpegRef.current;

      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          'text/javascript',
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          'application/wasm',
        ),
      });

      // 録音データの変換
      const inputFileName = 'input.webm';
      const outputFileName = 'output.wav';

      const file = new File([recordingBlob], inputFileName, {
        type: recordingBlob.type,
        lastModified: Date.now(),
      });

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));
      await ffmpeg.exec(['-i', inputFileName, outputFileName]);
      const output = await ffmpeg.readFile(outputFileName);

      const wavBlob = new Blob([output], { type: 'audio/wav' });

      // 録音データのセットアップ
      const audio = audioRef.current!;
      audio.src = URL.createObjectURL(wavBlob);

      // const link = document.createElement('a');
      // link.href = audio.src;
      // link.download = 'recorded.wav';
      // link.click();
    })();
  }, [recordingBlob]);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  };

  return (
    <Container p={0}>
      <Title order={5} mb={4}>
        生成元音声の設定
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        生成される音声はこの録音データを元に生成されます録音データ(生成元音声)は1つのアカウントで1つだけです。録音データは学習後、削除されます。
      </Text>
      <Stack align="center" gap="xs" my="lg">
        <ActionIcon
          variant="filled"
          color="orange"
          size="xl"
          radius="xl"
          aria-label="Settings"
          onClick={handleToggleRecording}
        >
          <IconMicrophone
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
        <Button variant="transparent" color="orange" size="compact-xs">
          タップして録音
        </Button>
        <Center>{recordingTime}</Center>
      </Stack>
      <Title order={6} mb={4}>
        録音音声
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        生成される音声はこの録音データを元に生成されます
      </Text>
      <audio ref={audioRef} controls />
    </Container>
  );
};
