import { DUMMY_COMPLETED_SONG_LIST } from '@/service/mocks/dummies/CompleteSongList';
import { DUMMY_SHARE_SONG } from '@/service/mocks/dummies/ShareSong';
import { DUMMY_AI_SONGS } from '@/service/mocks/dummies/SongList';
import { DUMMY_WORKROOM_LIST } from '@/service/mocks/dummies/WorkroomList';
import { http, HttpResponse } from 'msw';
import { DUMMYSTUDIO } from './dummies/TrackList';

const BASEURL = process.env.NEXT_PUBLIC_API_BASE;
export const handlers = [
  http.get(`${BASEURL}/work/studio/1`, () => {
    return HttpResponse.json(DUMMYSTUDIO);
  }),
  http.delete(`${BASEURL}/work/studio/1`, () => {
    return new Response(null, {
      status: 204,
    });
  }),
  http.delete(`${BASEURL}/work/track/:id`, () => {
    return new Response(null, {
      status: 204,
    });
  }),
  http.put(`${BASEURL}/work/studio/:id`, () => {
    return new Response(null, {
      status: 204,
    });
  }),
  http.get(`${BASEURL}/song/:workroom_id`, () => {
    return HttpResponse.json(DUMMY_AI_SONGS);
  }),

  http.post(`${BASEURL}/song/:workroom_id`, () => {
    return new Response(null, {
      status: 204,
    });
  }),

  http.get(`${BASEURL}/S3/:workroom_id`, () => {
    return new Response(null, {
      status: 200,
    });
  }),

  http.put(`${BASEURL}/presignedUrl/:workroom_id`, () => {
    return new Response(null, {
      status: 200,
    });
  }),

  http.post(`${BASEURL}/work/check/:workroom_id`, () => {
    return new Response(null, {
      status: 200,
    });
  }),

  http.get(`${BASEURL}/work/studio`, () => {
    return HttpResponse.json(DUMMY_WORKROOM_LIST);
  }),

  http.get(`${BASEURL}/song`, () => {
    return HttpResponse.json(DUMMY_COMPLETED_SONG_LIST);
  }),

  http.post(`${BASEURL}/work/studio`, () => {
    return new Response(null, {
      status: 201,
    });
  }),

  http.get(`${BASEURL}/song/share/1`, () => {
    return HttpResponse.json(DUMMY_SHARE_SONG);
  }),
];
