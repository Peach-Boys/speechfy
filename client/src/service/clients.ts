import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
});

export const presignedClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});
