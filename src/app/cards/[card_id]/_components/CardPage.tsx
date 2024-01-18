'use client';

import { IconExternalLink } from '@tabler/icons-react';
import jsPDF from 'jspdf';
import { domToCanvas } from 'modern-screenshot';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Button } from '@/shared/components/common/Button';
import { Flex, Stack } from '@/shared/components/common/Layout';
import { Modal } from '@/shared/components/common/Modal';
import { BusinessCard } from '@/shared/components/features';
import { recoilScaleState } from '@/shared/components/features/BusinessCard/atom';
import {
  IconBallpen,
  IconDownload,
  IconPhotoSearch,
} from '@/shared/components/icons';
import { ROUTES } from '@/shared/constants';
import {
  useDeleteBusinessCard,
  useGetBusinessCard,
} from '@/shared/hooks/restapi/v1/BusinessCard';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { isApiError } from '@/shared/lib/axios/errorHandling';
import { useDisclosure } from '@/shared/lib/mantine';
import { useLoading } from '@/shared/providers/loading';

export const CardPage = () => {
  const router = useRouter();
  const params = useParams<{ card_id: string }>();
  const [opened, { open, close }] = useDisclosure();
  const { data, error, isLoading } = useGetBusinessCard(params.card_id);
  const { open: openLoading, close: closeLoading } = useLoading();
  const { deleteBusinessCard } = useDeleteBusinessCard(params.card_id);
  const { infoNotification, errorNotification } = useNotifications();
  const recoilScale = useRecoilValue(recoilScaleState);

  const exportPDF = async () => {
    const element = document.getElementById(`business_card`);
    if (!element) return;

    const canvas = await domToCanvas(element, {});
    const imageData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');

    // 名刺のサイズ
    const cardWidth = 91 * (1 / recoilScale);
    const cardHeight = 55 * (1 / recoilScale);

    // A4サイズの寸法
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 5;

    // A4用紙に収まる名刺の数を計算
    const cardsPerRow = Math.floor(pageWidth / cardWidth);
    const cardsPerColumn = Math.floor(pageHeight / cardHeight);

    // A4用紙に名刺を配置
    for (let row = 0; row < cardsPerColumn; row++) {
      for (let col = 0; col < cardsPerRow; col++) {
        const x = col * cardWidth + margin;
        const y = row * cardHeight + margin;
        pdf.addImage(imageData, 'PNG', x, y, cardWidth, cardHeight);
      }
    }

    pdf.save(`${data?.displayName}.pdf`);
  };

  const handleDelete = async () => {
    try {
      openLoading();
      if (!data) return;

      await deleteBusinessCard();

      infoNotification('名刺を削除しました');
      router.replace(ROUTES.cards.base);
    } catch (error) {
      const message = '名刺の削除に失敗しました';

      if (isApiError(error)) {
        errorNotification(error.response?.data.error ?? message);
      } else {
        errorNotification(message);
      }
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    if (isLoading) openLoading();
    else closeLoading();
  }, [closeLoading, isLoading, openLoading]);

  if (error) return <div>failed to load</div>;

  if (!data) return null;
  return (
    <>
      <Stack align="center">
        <BusinessCard card={data} id="business_card" />
        <Stack gap="md" align="center" w={(1254 / 3) * recoilScale}>
          <Button
            fullWidth
            variant="transparent"
            leftSection={<IconExternalLink />}
            component={Link}
            href={ROUTES.cards.public(params.card_id)}
            target="_blank"
          >
            ARを確認する
          </Button>
          <Button
            fullWidth
            onClick={open}
            leftSection={<IconPhotoSearch />}
            variant="light"
          >
            拡大表示
          </Button>
          <Button fullWidth leftSection={<IconBallpen />} variant="outline">
            名刺を編集する
          </Button>
          <Button fullWidth leftSection={<IconDownload />} onClick={exportPDF}>
            名刺をダウンロード
          </Button>
          <Button fullWidth color="red" onClick={handleDelete}>
            名刺を削除する
          </Button>
        </Stack>
      </Stack>
      <Modal opened={opened} onClose={close} fullScreen>
        <Flex h="100%">
          <BusinessCard
            card={data}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(90deg) scale(${1.25})`,
            }}
          />
        </Flex>
      </Modal>
    </>
  );
};
