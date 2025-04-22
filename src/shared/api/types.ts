/**
 * @description Base Response Type - you can use this type for api response
 * @template T - data type
 * @example
 * const response = await api.get<BaseResponse<User>>('/users');
 *
 */
export type BaseResponse<T> = {
  code?: string;
  message: string;
  data: T;
};
