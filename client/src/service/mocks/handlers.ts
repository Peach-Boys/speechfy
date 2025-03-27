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
];
