'use client';

import { IconBallpen, IconDownload } from '@tabler/icons-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { Button } from '@/shared/components/common/Button';
import { Stack } from '@/shared/components/common/Layout';
import { BusinessCard } from '@/shared/components/features';
import { recoilScaleState } from '@/shared/components/features/BusinessCard/atom';
import { useGetBusinessCard } from '@/shared/hooks/restapi/v1/BusinessCard';
import { useLoading } from '@/shared/providers/loading';

export const CardPage = () => {
  const params = useParams<{ card_id: string }>();
  const { data, error, isLoading } = useGetBusinessCard(params.card_id);
  const { open, close } = useLoading();
  const recoilScale = useRecoilValue(recoilScaleState);

  const exportPDF = async () => {
    const element = document.getElementById(`business_card`);
    if (!element) return;
    const canvas = await html2canvas(element, {
      useCORS: true,
      logging: true,
      allowTaint: false,
    });
    const imageData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imageData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 名刺のサイズ
    const cardWidth = 91 * (1 / recoilScale);
    const cardHeight = 55 * (1 / recoilScale);

    console.debug(cardWidth, cardHeight);
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

  if (error) return <div>failed to load</div>;
  if (isLoading) open();
  if (!isLoading) close();

  if (!data) return null;
  return (
    <Stack align="center">
      <BusinessCard card={data} id="business_card" />
      <Button leftSection={<IconBallpen />} fullWidth variant="outline">
        名刺を編集する
      </Button>
      <Button leftSection={<IconDownload />} onClick={exportPDF} fullWidth>
        名刺をダウンロード
      </Button>
    </Stack>
  );
};
