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
import { IconChevronLeft, IconChevronRight } from '@/shared/components/icons';
import { ROUTES } from '@/shared/constants';

const steps = [0, 1, 2, 3] as const;
type Step = (typeof steps)[number];

type StepInput<T extends Step> = T extends 0
  ? { id: string } | undefined
  : T extends 1
  ? { audio: File; text: string } | undefined
  : T extends 2
  ? { image?: File } | undefined
  : T extends 3
  ? null
  : never;

export type RequestBodyies = {
  [key in Step]: StepInput<key>;
};

type State = {
  active: Step;
  requestBodyies: RequestBodyies;
};

const initialState: State = {
  active: 0,
  requestBodyies: {
    '0': undefined,
    '1': undefined,
    '2': undefined,
    '3': null,
  },
};

export const CreateArAssetStepper = () => {
  const [requestBodyies, setRequestBodyies] = useState(
    initialState.requestBodyies,
  );
  const [active, setActive] = useState(initialState.active);

  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep as Step);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep) as Step);
  };

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active !== step && active !== 3;

  return (
    <Container>
      <Stepper
        active={active}
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
              disabled={requestBodyies[active as Step] === undefined}
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

      {/* TODO: 仮実装 */}
      <button
        onClick={() => {
          setRequestBodyies((prev) => {
            return {
              ...prev,
              '0': { id: '1' },
            };
          });
        }}
      >
        STEP0
      </button>
    </Container>
  );
};
