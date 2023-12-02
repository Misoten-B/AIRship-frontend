import {
  RecordedModelSettings,
  SpeakingAssetsSettings,
} from './SpeakingSettingsContent';
import { Container } from '@/shared/components/common/Container';
import { Divider } from '@/shared/components/common/Divider';
import { Title } from '@/shared/components/common/Title';

export const SpeakingSettings = () => {
  return (
    <Container>
      <Title order={3} mb={16}>
        音声データの設定
      </Title>
      <RecordedModelSettings />
      <Divider my="sm" />
      <SpeakingAssetsSettings />
    </Container>
  );
};
