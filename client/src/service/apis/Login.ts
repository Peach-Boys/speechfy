import { client } from '../clients';

export async function login(code: string): Promise<void> {
  try {
    const res = await client.post('/login', { code: code });
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
}

export async function logout(): Promise<void> {
  try {
    await client.post('/logout');
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
}
