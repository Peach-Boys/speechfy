import { http, HttpResponse } from 'msw';
import { DUMMYSTUDIO } from './dummies/TrackList';
const BASEURL = process.env.Next_PUBLIC_API_BASE_URL;
export const handlers = [
  http.get(`http://testapi:3000/api/work/studio/1`, () => {
    return HttpResponse.json(DUMMYSTUDIO);
  }),
];
