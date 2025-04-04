import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTrack } from '../apis/Workspace';
import { ITrack } from '@/types/track';

export const useCopyTrack = (
  workId: string,
  tracks: ITrack[],
  order: number
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      const updatedTracks = tracks.map((track) => {
        return {
          trackId: track.trackId,
          order: track.order,
          trackName: track.trackName,
        };
      });
      updatedTracks.push({
        trackId: tracks[order - 1].trackId,
        order: tracks.length + 1,
        trackName: tracks[order - 1].trackName,
      });
      console.log(updatedTracks);
      return updateTrack(workId, updatedTracks);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
