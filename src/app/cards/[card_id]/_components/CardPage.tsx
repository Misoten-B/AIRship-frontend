'use client';

import { useParams } from 'next/navigation';
import { Loader } from '@/shared/components/common/Loader';
import { BusinessCard } from '@/shared/components/features';
import { useGetBusinessCard } from '@/shared/hooks/restapi/v1/BusinessCard';

export const CardPage = () => {
  const params = useParams<{ card_id: string }>();
  const { data, error, isLoading } = useGetBusinessCard(params.card_id);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loader />;

  if (!data) return null;
  return <BusinessCard text={data.displayName ?? '名無し'} />;
};
