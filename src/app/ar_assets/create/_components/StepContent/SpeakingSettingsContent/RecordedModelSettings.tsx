import { ActionIcon, Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { IconMicrophone } from '@/shared/components/icons/IconMicrophone';

export const RecordedModelSettings = () => {
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
        >
          <IconMicrophone
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
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
      <audio controls src=""></audio>
    </Container>
  );
};
