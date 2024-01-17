import {
  ActionIcon,
  CopyButton as MantineCopyButton,
  Tooltip,
  rem,
} from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';

type Props = {
  value: string;
};

export const CopyButton = ({ value }: Props) => {
  return (
    <MantineCopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <IconCheck style={{ width: rem(16) }} />
            ) : (
              <IconCopy style={{ width: rem(16) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </MantineCopyButton>
  );
};
