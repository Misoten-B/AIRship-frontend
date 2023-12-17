import { NotificationData } from '@mantine/notifications';
import { IconX } from '../../icons';

export const ErrorNotificationData = (
  title: string,
  message: string,
): NotificationData => {
  return {
    title: title,
    message: message,
    color: 'red',
    withBorder: true,
    autoClose: 5000,
    icon: <IconX />,
  };
};
