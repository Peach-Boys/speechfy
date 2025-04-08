import SharePlayer from '@/components/features/SharePlayer';
import { initializeMSW } from '@/lib/msw';
import { getShareSong } from '@/service/apis/Share';

type Props = {
  params: {
    id: string;
  };
};

const PlayerPage = async ({ params }: Props) => {
  if (process.env.NODE_ENV === 'development') {
    await initializeMSW();
  }
  const { id } = params;
  const songId = Number(id);
  const data = await getShareSong(songId);

  return (
    <>
      <SharePlayer song={data} />
    </>
  );
};

export default PlayerPage;
