import { useCallback } from 'react';
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
import { useForm } from '@/shared/hooks/useForm';

const schema = z.object({
  threeDModel: z.string(),
});

const fileInputSchema = z.object({
  fileInput: z.string(),
});

type FormSchemaType = z.infer<typeof schema>;
type FileInputSchemaType = z.infer<typeof fileInputSchema>;

type Props = {
  nextStep: () => void;
};

export const Select3dModel = ({ nextStep }: Props) => {
  const { control, setValue } = useForm<FormSchemaType>({
    defaultValues: {
      threeDModel: '',
    },
  });
  const { control: fileInputControl } = useForm<FileInputSchemaType>({
    defaultValues: {
      fileInput: '',
    },
  });

  const requestBodies = useRequestBodiesValue();
  const setRequestBodies = useSetRequestBodies();

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

      <div>
        {/* FIXME: 仮実装 */}
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
      </div>
    </Container>
  );
};
