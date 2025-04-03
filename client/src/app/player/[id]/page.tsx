import SharePlayer from '@/components/features/SharePlayer';
import { initializeMSW } from '@/lib/msw';
import { getShareSong } from '@/service/apis/Share';

type Props = {
  params: {
    id: string;
  };
};

async function PlayerPage({ params }: Props) {
  await initializeMSW();
  const songId = Number(params.id);
  const data = await getShareSong(songId);

  return (
    <>
      <SharePlayer song={data} />
    </>
  );
}

export default PlayerPage;
