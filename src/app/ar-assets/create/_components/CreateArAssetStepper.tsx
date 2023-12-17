'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useRequestBodiesValue } from './RequestBodiesProvider';
import {
  CompletedArAsset,
  Select3dModel,
  SpeakingSettings,
  UploadQRCodeInsideImage,
} from './StepContent';
import { Step } from './types';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Group, Space } from '@/shared/components/common/Layout';
import { Anchor } from '@/shared/components/common/Navigation';
import { Stepper } from '@/shared/components/common/Stepper';
import { IconChevronLeft, IconChevronRight } from '@/shared/components/icons';
import { ROUTES } from '@/shared/constants';

type State = {
  active: Step;
};

const initialState: State = {
  active: 0,
};

export const CreateArAssetStepper = () => {
  const [active, setActive] = useState(initialState.active);

  const requestBodies = useRequestBodiesValue();
  console.log(requestBodies);

  const nextStep = () =>
    setActive((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));
  const prevStep = () =>
    setActive((prev) => (prev > 0 ? ((prev - 1) as Step) : prev));

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep as Step);
  };

  return (
    <Container>
      <Stepper
        active={active}
        radius="sm"
        size="xs"
        iconSize={20}
        allowNextStepsSelect={false}
        styles={{
          separator: { margin: '2px' },
          stepLabel: { fontSize: '9px' },
          stepDescription: { fontSize: '7px' },
          stepBody: { margin: '3px' },
        }}
      >
        <Stepper.Step label="3Dモデルの選択" description="アップロードと選択">
          <Select3dModel nextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Step
          label="音声データの設定"
          description="録音と話させる文章の登録"
        >
          <SpeakingSettings nextStep={nextStep} prevStep={prevStep} />
        </Stepper.Step>
        <Stepper.Step label="QRコード内画像" description="画像をアップロード">
          <UploadQRCodeInsideImage prevStep={prevStep} />
        </Stepper.Step>
        <Stepper.Completed>
          <CompletedArAsset />
        </Stepper.Completed>
      </Stepper>

      {active == 3 ? (
        <Anchor component={Link} href={ROUTES.arAssets.base}>
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
