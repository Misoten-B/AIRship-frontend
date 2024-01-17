'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/common/Button';
import { Textarea } from '@/shared/components/common/Input';
import { Center, Group, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { ROUTES } from '@/shared/constants';
import {
  useGetArAsset,
  useUpdateArAsset,
} from '@/shared/hooks/restapi/v1/ArAssets';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { isApiError } from '@/shared/lib/axios/errorHandling';
import { useLoading } from '@/shared/providers/loading';

type Props = {
  id: string;
};

type State = {
  isEditing: boolean;
};

type FieldValues = {
  speakingDescription: string;
};

const initialState: State = {
  isEditing: false,
};

const initFieldValues: FieldValues = {
  speakingDescription: '',
};

export const SpeakingArea = ({ id }: Props) => {
  const { data, error, isLoading, mutate } = useGetArAsset(id);
  const { open, close } = useLoading();
  const { control, setValue, handleSubmit } = useForm<FieldValues>({
    defaultValues: initFieldValues,
  });
  const [isEditing, setIsEditing] = useState(initialState.isEditing);
  const { infoNotification, errorNotification } = useNotifications();
  const { updateArAsset } = useUpdateArAsset(id);

  useEffect(() => {
    if (isLoading) open();
    if (!isLoading) close();

    return () => close();
  }, [close, isLoading, open]);

  const handleClick = () => {
    if (isEditing) {
      handleSubmit(updateSpeakingDescription)();
    } else {
      openEditMode();
    }
  };

  const updateSpeakingDescription = async (values: FieldValues) => {
    try {
      open();
      if (!data) return;

      await updateArAsset(values.speakingDescription, data.threeDimentionalId);

      infoNotification('話させる文章を更新しました');
      mutate();
      closeEditMode();
    } catch (error) {
      const message = '話させる文章の更新に失敗しました';

      if (isApiError(error)) {
        errorNotification(error.response?.data.error ?? message);
      } else {
        errorNotification(message);
      }
    } finally {
      close();
    }
  };

  const openEditMode = () => {
    setIsEditing(true);
    setValue('speakingDescription', data?.speakingDescription ?? '');
  };

  const closeEditMode = () => {
    setIsEditing(initialState.isEditing);
  };

  if (!data) return null;
  if (error) return <div>failed to load</div>;

  return (
    <Stack gap={0}>
      <Stack gap={0}>
        <Title order={5} c="blue.6" mb={4}>
          音声データ
        </Title>
        <Text size="xs" c="gray.6" mb={12}>
          QRコードを読み込むと再生できる音声です。
        </Text>
        <Stack align="flex-end" gap={4}>
          <Center mt={8} w={'100%'}>
            <audio
              controls
              src={data.speakingAudioPath}
              style={{ width: '100%' }}
            ></audio>
          </Center>
          <Button
            variant="light"
            size="xs"
            radius="xl"
            color="blue.3"
            component={Link}
            href={ROUTES.record.base}
          >
            AI化した音声を変更する場合はこちら
          </Button>

          <Text size="xs" c="gray.6" mb={12}>
            AI化した音声を変更した場合、再度音声を生成する必要があります。
          </Text>
        </Stack>
      </Stack>

      <Title order={6} c="blue.6" my={4}>
        話させる文章
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        登録した声がAI化されて再生される文章です
      </Text>
      <Stack align="flex-start" justify="flex-start" mb={12} gap="xs">
        {isEditing ? (
          <Textarea
            name="speakingDescription"
            control={control}
            placeholder="100文字以下で入力してください。"
            autosize
            minRows={3}
            mb={8}
            w={'100%'}
            autoFocus
          />
        ) : (
          <Text size="sm" mb={8} ta="left">
            {data.speakingDescription}
          </Text>
        )}
        <Group>
          {isEditing && (
            <Button
              variant="outline"
              color="orange"
              size="xs"
              radius="xl"
              onClick={closeEditMode}
            >
              キャンセル
            </Button>
          )}
          <Button
            variant={isEditing ? 'filled' : 'outline'}
            color="orange"
            size="xs"
            radius="xl"
            onClick={handleClick}
          >
            {isEditing ? '保存して合成音声を生成する' : '編集する'}
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
};
