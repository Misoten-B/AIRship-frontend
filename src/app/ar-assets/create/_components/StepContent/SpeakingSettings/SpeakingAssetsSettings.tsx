import { useForm } from 'react-hook-form';
import { useSetRequestBodies } from '../../RequestBodiesProvider';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Textarea } from '@/shared/components/common/Input';
import { Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';

export const SpeakingAssetsSettings = () => {
  const setRequestBodies = useSetRequestBodies();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      text: '',
    },
  });

  const setSpeakingText = (data: any) => {
    setRequestBodies((prev) => ({
      ...prev,
      '1': {
        ...prev['1'],
        text: data.text,
      },
    }));
  };

  return (
    <Container p={0}>
      <Title order={5} mb={4}>
        合成音声の設定
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        QRコードを読み込むと再生できる音声です。
      </Text>
      <Title order={6} mb={4}>
        合成音声
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        生成されるまでに5分ほどかかる場合があります
      </Text>
      <audio controls src=""></audio>
      <Title order={6} my={4}>
        話させる文章
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        登録した声がAI化されて再生される文章です
      </Text>
      <Stack align="flex-start" justify="flex-start" mb={12} gap="xs">
        <form onSubmit={handleSubmit(setSpeakingText)}>
          <Textarea
            name="text"
            control={control}
            placeholder="100文字以下で入力してください。"
            autosize
            minRows={3}
            mb={8}
            w={'100%'}
          />
          <Button
            variant="outline"
            color="orange"
            size="xs"
            radius="xl"
            type="submit"
          >
            保存して合成音声を生成する
          </Button>
        </form>
      </Stack>
    </Container>
  );
};
