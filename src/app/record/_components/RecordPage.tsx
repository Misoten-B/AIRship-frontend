'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActionIcon, Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Group, Stack } from '@/shared/components/common/Layout';
import { Modal } from '@/shared/components/common/Modal';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import {
  IconMicrophone,
  IconPlayerRecord,
  IconPlayerStop,
} from '@/shared/components/icons';
import { ROUTES } from '@/shared/constants';
import { useUpdateUser } from '@/shared/hooks/restapi/v1/User';
import { useAudioRecorder } from '@/shared/hooks/useAudioRecorder';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { FFmpeg, loadFFmpeg, transcodeFile } from '@/shared/lib/ffmpeg';
import { useDisclosure } from '@/shared/lib/mantine';
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

  const { infoNotification } = useNotifications();

  const [opened, { open, close }] = useDisclosure(false);
  const [elapsedTimeMs, setElapsedTimeMs] = useState<number>(0);
  const updateInterval: number = 100; // ミリ秒単位での更新間隔

  useEffect(() => {
    let interval: NodeJS.Timeout | number; // Node.js環境の場合はNodeJS.Timeout、ブラウザ環境の場合はnumber

    if (isRecording) {
      setElapsedTimeMs(0); // 録音開始時にタイマーをリセット
      interval = setInterval(() => {
        setElapsedTimeMs((prevTime) => prevTime + updateInterval);
      }, updateInterval);
    }

    return () => clearInterval(interval as NodeJS.Timeout); // コンポーネントのアンマウント時にクリア
  }, [close, isRecording, stopRecording]);

  // 録音時間がMAX_RECORDING_TIMEを超えたら録音を停止する
  useEffect(() => {
    if (!isRecording) return;
    if (recordingTime <= MAX_RECORDING_TIME) return;

    stopRecording();
    close();
  }, [close, isRecording, recordingTime, stopRecording]);

  // 録音データが更新されたらセットする
  useEffect(() => {
    if (!recordingBlob) return;

    const audio = audioRef.current!;
    audio.src = URL.createObjectURL(recordingBlob);
  }, [recordingBlob]);

  const handleToggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
      close();
      return;
    }
    startRecording();
  }, [close, isRecording, startRecording, stopRecording]);

  // 音声データをアップロードする
  const handleUpload = async () => {
    if (!recordingBlob) return;

    try {
      toggleLoading();

      const wavFile = await convertToWav(recordingBlob);
      await updateUser(true, wavFile);

      infoNotification('音声モデルの生成が完了しました');
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
          // onClick={handleToggleRecording}
          onClick={open}
        >
          <IconMicrophone
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
        <Modal opened={opened} onClose={close}>
          <Title order={5} mb={4}>
            生成元音声の設定
          </Title>
          <Text size="xs" c="gray.6" mb={12}>
            最大10秒間の音声を録音してください。
          </Text>
          <Stack align="center" pb="md" h="60vh" justify="space-evenly">
            <Text
              size="xl"
              mb={12}
              style={{
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {`${(elapsedTimeMs / 1000).toFixed(1)}`}
              <Text span size="md" c="gray.9" ml="xs">
                秒
              </Text>
            </Text>
            <ActionIcon
              variant="filled"
              color="red"
              size="xl"
              radius="xl"
              aria-label="Settings"
              onClick={handleToggleRecording}
            >
              {isRecording ? (
                <IconPlayerStop style={{ width: '70%', height: '70%' }} />
              ) : (
                <IconPlayerRecord style={{ width: '70%', height: '70%' }} />
              )}
            </ActionIcon>
          </Stack>
        </Modal>
        <Button variant="transparent" color="orange" size="compact-xs">
          タップして録音
        </Button>
      </Stack>
      <Title order={6} mb={4}>
        録音音声
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        生成される音声はこの録音データを元に生成されます
      </Text>
      <Center>
        <audio ref={audioRef} controls style={{ width: '90%' }} />
      </Center>
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
