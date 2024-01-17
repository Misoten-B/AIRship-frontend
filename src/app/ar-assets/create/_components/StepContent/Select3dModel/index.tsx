import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';
import {
  useRequestBodiesValue,
  useSetRequestBodies,
} from '../../RequestBodiesProvider';
import { Button, FileButton } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Grid, Group } from '@/shared/components/common/Layout';
import { Title } from '@/shared/components/common/Title';
import { SelectThreeDModel } from '@/shared/components/features/SelectThreeDModel';
import { IconChevronRight, IconUpload } from '@/shared/components/icons';
import {
  useCreateThreeDimentionalModel,
  useGetThreeDimentionalModels,
} from '@/shared/hooks/restapi/v1/ThreeDimentionalModel';
import { useForm } from '@/shared/hooks/useForm';
import { useLoading } from '@/shared/providers/loading';

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
  const { mutate } = useGetThreeDimentionalModels();
  const { open, close } = useLoading();
  const [file, setFile] = useState<File | null>(null);

  const { createThreeDimentionalModel } = useCreateThreeDimentionalModel();

  const { control, setValue } = useForm<FormSchemaType>({
    defaultValues: {
      threeDModel: requestBodies[0]?.id ?? '',
    },
  });
  const {
    control: fileInputControl,
    setValue: setFileInputValue,
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
        open();
        await createThreeDimentionalModel(file);
        reset({ fileInput: undefined });
        mutate();
        close();
      } catch (error) {
        console.log(error);
      } finally {
        close();
      }
    });
    return () => subscription.unsubscribe();
  }, [createThreeDimentionalModel, watch, reset, mutate, open, close]);

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
            <FileButton
              name="fileInput"
              onChange={(value) => {
                if (!value) return;
                setFileInputValue('fileInput', value);
              }}
              accept=".glb"
            >
              {(props) => (
                <Button
                  variant="outline"
                  {...props}
                  leftSection={<IconUpload />}
                >
                  Upload
                </Button>
              )}
            </FileButton>
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
