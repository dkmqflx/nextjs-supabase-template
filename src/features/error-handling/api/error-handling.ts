import apiClient from '@/shared/api/apiClient';

export const requestClientError = async () => {
  const { data } = await apiClient.post<null, undefined>('/api/error/client', undefined);

  return data;
};

export const requestServerError = async () => {
  const { data } = await apiClient.post<null, undefined>('/api/error/server', undefined);

  return data;
};

export const getClientError = async () => {
  const { data } = await apiClient.get<null>('/api/error/client');

  return data;
};
