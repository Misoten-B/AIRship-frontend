'use client';
import classes from './Footer.module.css';
import { Text } from '@/shared/components/common/Text';
import { useMediaQuery } from '@/shared/lib/mantine';

export const Footer = () => {
  const isPC = useMediaQuery('(min-width: 768px)');
  return (
    <div className={classes.container}>
      <Text c="white" ta="center" size={isPC ? 'sm' : 'xs'}>
        © 2024 HAL名古屋未来創造展 | グループ番号: H439
      </Text>
    </div>
  );
};
