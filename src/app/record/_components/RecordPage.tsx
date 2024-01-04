'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { ActionIcon, Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { notifications } from '@/shared/components/common/Feedback';
import { Center, Group, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { IconMicrophone } from '@/shared/components/icons';
import { ROUTES } from '@/shared/constants';
import { useUpdateUser } from '@/shared/hooks/restapi/v1/User';
import { useAudioRecorder } from '@/shared/hooks/useAudioRecorder';
import { FFmpeg, loadFFmpeg, transcodeFile } from '@/shared/lib/ffmpeg';
import { useToggleLoading } from '@/shared/providers/loading';

const MAX_RECORDING_TIME = 10;

export const RecordPage = () => {
  const toggleLoading = useToggleLoading();
  const { updateUser } = useUpdateUser();
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement>(null);
  const ffmpegRef = useRef(new FFmpeg());

  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    recordingBlob,
  } = useAudioRecorder();

  // 録音時間がMAX_RECORDING_TIMEを超えたら録音を停止する
  useEffect(() => {
    if (!isRecording) return;
    if (recordingTime <= MAX_RECORDING_TIME) return;

    stopRecording();
  }, [isRecording, recordingTime, stopRecording]);

  // 録音データが更新されたらセットする
  useEffect(() => {
    if (!recordingBlob) return;

    const audio = audioRef.current!;
    audio.src = URL.createObjectURL(recordingBlob);
  }, [recordingBlob]);

  const handleToggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  }, [isRecording, startRecording, stopRecording]);

  // 音声データをアップロードする
  const handleUpload = async () => {
    if (!recordingBlob) return;

    try {
      toggleLoading();

      const wavFile = await convertToWav(recordingBlob);
      await updateUser(true, wavFile);

      notifications.show({
        message: '音声モデルの生成が完了しました',
      });
      router.push(ROUTES.arAssets.create);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  };

  // 録音した音声をWavファイルに変換する
  const convertToWav = async (blob: Blob) => {
    const ffmpeg = ffmpegRef.current;
    await loadFFmpeg(ffmpeg);

    // BlobをFileに変換する
    const inputFileName = 'input.webm';
    const outputFileName = 'output.wav';

    const file = new File([blob], inputFileName, {
      type: blob.type,
      lastModified: Date.now(),
    });

    // BlobFileをWavに変換する
    const output = await transcodeFile(
      ffmpeg,
      file,
      inputFileName,
      outputFileName,
    );

    return new File([output], outputFileName);
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
      <Group my="xl" p={0} justify="flex-end">
        <Button
          variant="outline"
          color="orange"
          size="xs"
          radius="xl"
          onClick={handleUpload}
          disabled={!recordingBlob}
        >
          保存して音声モデルを生成する
        </Button>
      </Group>
    </Container>
  );
};
