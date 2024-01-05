import { notifications } from '@mantine/notifications';
import { useCallback } from 'react';
import { IconX } from '../../components/icons';

export const useNotifications = () => {
  const infoNotification = useCallback((title: string, message?: string) => {
    notifications.show({
      title,
      message,
    });
  }, []);

  const warnNotification = useCallback((title: string, message?: string) => {
    notifications.show({
      title: title,
      message: message,
      color: 'yellow',
      withBorder: true,
      autoClose: 5000,
      icon: <IconX />,
    });
  }, []);

  const errorNotification = useCallback((title?: string, message?: string) => {
    notifications.show({
      title: title ?? 'エラーが発生しました',
      message: message,
      color: 'red',
      withBorder: true,
      autoClose: 5000,
      icon: <IconX />,
    });
  }, []);

  return { infoNotification, warnNotification, errorNotification };
};
