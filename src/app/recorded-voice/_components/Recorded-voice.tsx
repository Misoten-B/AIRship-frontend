'use client';
import { RecordedModelSettings } from '@/app/ar-assets/create/_components/StepContent/SpeakingSettingsContent';
import { Container } from '@/shared/components/common/Container';

export const RecordedVoice = () => {
  return (
    <Container mt={12} mb={64}>
      <RecordedModelSettings />
    </Container>
  );
};
