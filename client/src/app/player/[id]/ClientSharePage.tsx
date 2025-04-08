'use client';

import React from 'react';
import SharePlayer from '@/components/features/SharePlayer';
import { useParams } from 'next/navigation';
import { useGetShare } from '@/service/queries/useGetShare';
import Spinner from '@/components/common/Spinner';

function ClientSharePage() {
  const { id } = useParams();
  const { data, isLoading } = useGetShare(Number(id));

  if (isLoading) return <Spinner />;

  return <SharePlayer song={data!} />;
}

export default ClientSharePage;
