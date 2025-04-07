import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
export const client = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const presignedClient = axios.create({
  baseURL: API_BASE,
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// 토큰 재발급 진행 여부와 대기 중인 요청들을 저장하는 변수
let isRefreshing = false;
let refreshSubscribers: Array<() => void> = [];

// refresh 완료 후, 대기 중인 모든 요청 재시도
function onRefreshed(): void {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

// refresh token 요청 대기 등록
function subscribeTokenRefresh(cb: () => void): void {
  refreshSubscribers.push(cb);
}

// GET /refresh 요청을 통해 토큰을 갱신
function refreshToken(): Promise<AxiosResponse> {
  return axios.get(`/refresh`, {
    withCredentials: true,
  });
}

// 요청 인터셉터는 필요 없음 (쿠키가 자동으로 전송되므로)

// 응답 인터셉터: 401 에러 발생 시 토큰 갱신 후 재시도 로직 구현
client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // 이미 다른 요청에서 refresh 진행 중이면 대기
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            resolve(client(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        // GET /refresh 호출 (쿠키를 통해 새 토큰이 설정됨)
        await refreshToken();
        // 대기 중인 요청 재시도
        onRefreshed();
        return client(originalRequest);
      } catch (err) {
        // refresh 실패 시, 예를 들어 로그인 페이지로 리다이렉트 처리할 수 있음
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        window.location.href = '/';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default client;
