import SharePlayer from '@/components/features/SharePlayer';
import { getShareSong } from '@/service/apis/Share';

const PlayerPage = async ({ params }: { params: { id: string } }) => {
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
