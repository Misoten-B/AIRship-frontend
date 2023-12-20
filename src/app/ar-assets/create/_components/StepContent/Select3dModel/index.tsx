import { useCallback, useEffect } from 'react';
import { z } from 'zod';
import {
  useRequestBodiesValue,
  useSetRequestBodies,
} from '../../RequestBodiesProvider';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { FileInput } from '@/shared/components/common/Input';
import { Grid, Group } from '@/shared/components/common/Layout';
import { Title } from '@/shared/components/common/Title';
import { SelectThreeDModel } from '@/shared/components/features/SelectThreeDModel';
import { IconChevronRight } from '@/shared/components/icons';
import { useCreateThreeDimentionalModel } from '@/shared/hooks/restapi/v1/ThreeDimentionalModel';
import { useForm } from '@/shared/hooks/useForm';

const schema = z.object({
  threeDModel: z.string(),
});

type FormSchemaType = z.infer<typeof schema>;

type FileFieldValues = {
  fileInput: File;
};

type Props = {
  nextStep: () => void;
};

export const Select3dModel = ({ nextStep }: Props) => {
  const requestBodies = useRequestBodiesValue();
  const setRequestBodies = useSetRequestBodies();

  const { createThreeDimentionalModel } = useCreateThreeDimentionalModel();

  const { control, setValue } = useForm<FormSchemaType>({
    defaultValues: {
      threeDModel: requestBodies[0]?.id ?? '',
    },
  });
  const {
    control: fileInputControl,
    watch,
    reset,
  } = useForm<FileFieldValues>({
    defaultValues: {
      fileInput: undefined,
    },
  });

  useEffect(() => {
    const subscription = watch(async (value) => {
      const file = value.fileInput;
      if (!file) return;

      try {
        await createThreeDimentionalModel(file);
        reset({ fileInput: undefined });
      } catch (error) {
        console.log(error);
      }
    });
    return () => subscription.unsubscribe();
  }, [createThreeDimentionalModel, watch, reset]);

  const set3DModelID = useCallback(
    (id: string) => {
      setRequestBodies((prev) => ({
        ...prev,
        '0': {
          id,
        },
      }));
    },
    [setRequestBodies],
  );

  const handleSetValue = (value: string) => {
    if (!value) return;
    setValue('threeDModel', value);
    set3DModelID(value);
  };

  return (
    <>
      <Container>
        <Title order={3} mb={16}>
          3Dモデルの選択
        </Title>

        <SelectThreeDModel control={control} setValue={handleSetValue} />

        <Grid>
          <Grid.Col span={4}>
            <FileInput
              control={fileInputControl}
              name="fileInput"
              placeholder="アップロード"
              size="xs"
              styles={{
                wrapper: { height: '100%' },
                root: { height: '100%' },
                input: { height: 'calc(100% - 28px)' },
              }}
            />
          </Grid.Col>
        </Grid>
      </Container>

      <Group my="xl" p={0} justify={'flex-end'}>
        <Button
          size="xs"
          rightSection={<IconChevronRight size={14} />}
          onClick={nextStep}
          disabled={requestBodies[0] === undefined}
        >
          次のステップへ
        </Button>
      </Group>
    </>
  );
};
