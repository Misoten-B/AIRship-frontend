import { useEffect } from 'react';
import {
  useRequestBodiesValue,
  useSetRequestBodies,
} from '../../RequestBodiesProvider';
import { Container } from '@/shared/components/common/Container';
import { Textarea } from '@/shared/components/common/Input';
import { Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { useForm } from '@/shared/hooks/useForm';

export const SpeakingAssetsSettings = () => {
  const requestBodies = useRequestBodiesValue();
  const setRequestBodies = useSetRequestBodies();

  const { control, watch } = useForm({
    defaultValues: {
      text: requestBodies['1']?.text ?? '',
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const text = value.text;
      if (!text) return;

      setRequestBodies((prev) => ({
        ...prev,
        '1': {
          ...prev['1'],
          text,
        },
      }));
    });
    return () => subscription.unsubscribe();
  }, [watch, setRequestBodies]);

  return (
    <Container p={0}>
      <Title order={5} mb={4}>
        合成音声の設定
      </Title>
      <Text size="xs" c="gray.6">
        QRコードを読み込むと再生できる音声です。
      </Text>
      <Text size="xs" c="gray.6" mb={12}>
        生成されるまでに5分ほどかかる場合があります。
      </Text>
      <Title order={6} my={4}>
        話させる文章
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        登録した声がAI化されて再生される文章です。
      </Text>
      <Stack align="flex-start" justify="flex-start" mb={12} gap="xs">
        <Textarea
          name="text"
          control={control}
          placeholder="100文字以下で入力してください。"
          autosize
          minRows={3}
          mb={8}
          w={'100%'}
        />
      </Stack>
    </Container>
  );
};
