'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  CompletedArAsset,
  Select3dModel,
  SpeakingSettings,
  UploadQRCodeInsideImage,
} from './StepContent';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Group, Space } from '@/shared/components/common/Layout';
import { Anchor } from '@/shared/components/common/Navigation';
import { Stepper } from '@/shared/components/common/Stepper';
import { IconChevronLeft } from '@/shared/components/icons/IconChevronLeft';
import { IconChevronRight } from '@/shared/components/icons/IconChevronRight';

export const CreateArAssetStepper = () => {
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active !== step && active !== 3;

  return (
    <Container>
      <Stepper
        active={active}
        onStepClick={setActive}
        radius="sm"
        size="xs"
        iconSize={20}
        styles={{
          separator: { margin: '2px' },
          stepLabel: { fontSize: '9px' },
          stepDescription: { fontSize: '7px' },
          stepBody: { margin: '3px' },
        }}
      >
        <Stepper.Step
          label="3Dモデルの選択"
          description="アップロードと選択"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          <Select3dModel />
        </Stepper.Step>
        <Stepper.Step
          label="音声データの設定"
          description="録音と話させる文章の登録"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          <SpeakingSettings />
        </Stepper.Step>
        <Stepper.Step
          label="QRコード内画像"
          description="画像をアップロード"
          allowStepSelect={shouldAllowSelectStep(2)}
        >
          <UploadQRCodeInsideImage />
        </Stepper.Step>
        <Stepper.Completed>
          <CompletedArAsset />
        </Stepper.Completed>
      </Stepper>

      {active == 3 ? (
        <Anchor component={Link} href="/ar-assets">
          QRコード一覧へ
        </Anchor>
      ) : (
        <Group
          my="xl"
          p={0}
          justify={active !== 0 ? 'space-between' : 'flex-end'}
        >
          {active !== 0 && (
            <Button
              variant="outline"
              size="xs"
              leftSection={<IconChevronLeft size={14} />}
              onClick={() => handleStepChange(active - 1)}
            >
              前のステップ
            </Button>
          )}
          {active !== 2 ? (
            <Button
              size="xs"
              rightSection={<IconChevronRight size={14} />}
              onClick={() => handleStepChange(active + 1)}
            >
              次のステップへ
            </Button>
          ) : (
            <Button size="xs" onClick={() => handleStepChange(active + 1)}>
              完了
            </Button>
          )}
        </Group>
      )}
      <Space h="md" />
    </Container>
  );
};
