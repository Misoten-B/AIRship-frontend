'use client';

import { useEffect, useRef } from 'react';
import { ActionIcon, Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { IconMicrophone } from '@/shared/components/icons/IconMicrophone';
import { useAudioRecorder } from '@/shared/hooks/useAudioRecorder';
import { FFmpeg, loadFFmpeg, transcodeFile } from '@/shared/lib/ffmpeg';

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
      // ffmpegのロード
      const ffmpeg = ffmpegRef.current;
      await loadFFmpeg(ffmpeg);

      // ファイルへ
      const inputFileName = 'input.webm';
      const outputFileName = 'output.wav';

      const file = new File([recordingBlob], inputFileName, {
        type: recordingBlob.type,
        lastModified: Date.now(),
      });

      // 変換
      const output = await transcodeFile(
        ffmpeg,
        file,
        inputFileName,
        outputFileName,
      );

      // const wavBlob = new Blob([output], { type: 'audio/wav' });
      const wavFile = new File([output], outputFileName);

      // 録音データのセットアップ
      const audio = audioRef.current!;
      // audio.src = URL.createObjectURL(wavBlob);
      audio.src = URL.createObjectURL(wavFile);
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
