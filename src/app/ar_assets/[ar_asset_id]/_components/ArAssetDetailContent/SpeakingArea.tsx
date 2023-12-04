'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/common/Button';
import { Textarea } from '@/shared/components/common/Input';
import { Center, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';

export const SpeakingArea = () => {
  const { control } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

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
            <audio controls src="" style={{ width: '100%' }}></audio>
          </Center>
          <Button variant="white" size="xs" radius="xl" color="blue.3">
            元の音声の編集はこちら
          </Button>
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
            name=""
            control={control}
            placeholder="100文字以下で入力してください。"
            autosize
            minRows={3}
            mb={8}
            w={'100%'}
          />
        ) : (
          <Text size="sm" mb={8} ta="left">
            初めまして。私の名前は田中太郎です。よろしくお願いします。
          </Text>
        )}
        <Button
          variant={isEditing ? 'filled' : 'outline'}
          color="orange"
          size="xs"
          radius="xl"
          onClick={toggleEditMode}
        >
          {isEditing ? '保存して合成音声を生成する' : '編集する'}
        </Button>
      </Stack>
    </Stack>
  );
};
