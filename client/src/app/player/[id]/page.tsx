import SharePlayer from '@/components/features/SharePlayer';
import { getShareSong } from '@/service/apis/Share';

interface Params {
  params: {
    id: string;
  };
}

const PlayerPage = async ({ params }: Params) => {
  const songId = Number(params.id);
  const data = await getShareSong(songId);

  return <SharePlayer song={data} />;
};

export default PlayerPage;
