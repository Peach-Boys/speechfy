import axios from 'axios';

console.log('process.env.API_BASE', process.env.API_BASE);
console.log('process.env.NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
export const client = axios.create({
  baseURL: 'http://testapi:3000/api',
});
