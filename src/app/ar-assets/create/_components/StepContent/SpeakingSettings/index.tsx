import { useRequestBodiesValue } from '../../RequestBodiesProvider';
import { RecordedModelSettings } from './RecordedModelSettings';
import { SpeakingAssetsSettings } from './SpeakingAssetsSettings';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Divider } from '@/shared/components/common/Divider';
import { Group } from '@/shared/components/common/Layout';
import { Title } from '@/shared/components/common/Title';
import { IconChevronLeft, IconChevronRight } from '@/shared/components/icons';

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

export const SpeakingSettings = ({ nextStep, prevStep }: Props) => {
  const requestBodies = useRequestBodiesValue();

  const isInvalidRequestBodies = () => {
    const speakingSettingsValues = requestBodies['1'];

    if (!speakingSettingsValues) {
      return true;
    }

    const { audio, text } = speakingSettingsValues;
    return !audio || !text;
  };

  return (
    <>
      <Container>
        <Title order={3} mb={16}>
          音声データの設定
        </Title>
        <RecordedModelSettings />
        <Divider my="sm" />
        <SpeakingAssetsSettings />
      </Container>

      {/* FIXME: 仮実装 */}
      <Group my="xl" p={0} justify={'space-between'}>
        <Button
          variant="outline"
          size="xs"
          leftSection={<IconChevronLeft size={14} />}
          onClick={prevStep}
        >
          前のステップ
        </Button>
        <Button
          size="xs"
          rightSection={<IconChevronRight size={14} />}
          onClick={nextStep}
          disabled={isInvalidRequestBodies()}
        >
          次のステップへ
        </Button>
      </Group>
    </>
  );
};
