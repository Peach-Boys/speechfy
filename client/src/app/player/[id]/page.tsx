import SharePlayer from '@/components/features/SharePlayer';
import { initializeMSW } from '@/lib/msw';
import { getShareSong } from '@/service/apis/Share';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const PlayerPage = async ({ params }: Props) => {
  await initializeMSW();
  const { id } = await params;
  const songId = Number(id);
  const data = await getShareSong(songId);

  return (
    <>
      <SharePlayer song={data} />
    </>
  );
};

export default PlayerPage;
