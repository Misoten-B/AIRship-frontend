import { z } from 'zod';
import { Container } from '@/shared/components/common/Container';
import { FileInput } from '@/shared/components/common/Input';
import { Grid } from '@/shared/components/common/Layout';
import { Title } from '@/shared/components/common/Title';
import { SelectThreeDModel } from '@/shared/components/features/SelectThreeDModel';
import { useForm } from '@/shared/hooks/useForm';

const schema = z.object({
  threeDModel: z.string(),
});

const fileInputSchema = z.object({
  fileInput: z.string(),
});

type FormSchemaType = z.infer<typeof schema>;
type FileInputSchemaType = z.infer<typeof fileInputSchema>;

type Props = {};

export const Select3dModel = ({}: Props) => {
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

  return (
    <Container>
      <Title order={3} mb={16}>
        3Dモデルの選択
      </Title>

      <SelectThreeDModel control={control} setValue={setValue} />

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
  );
};
