import { ZodSchema, z } from 'zod';

import { BASE_URL } from '../constants/baseUrl';
import type { BaseResponse } from './types';

class ApiClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  private async handleResponse<T>(response: Response, schema?: ZodSchema<T>): Promise<BaseResponse<T>> {
    if (!response.ok) {
      const result = await response.json();

      throw new Error(`${result?.message ?? `HTTP error. Status Code: ${response.status}`}`);
    }

    try {
      const result = await response.json();

      // Validate response using Zod
      if (schema) {
        schema.parse(result.data);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn('Validation error:', error.errors);
        throw new Error('API response validation failed');
      }

      console.warn('Error parsing JSON response:', error);
      throw new Error('Error parsing JSON response');
    }
  }

  private buildUrl(endpoint: string, queryParams?: Record<string, string | number | boolean>): string {
    const url = new URL(endpoint, this.baseUrl);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    return url.toString();
  }

  private async request<T>(
    method: string,
    endpoint: string,
    schema?: ZodSchema<T>,
    options?: RequestInit,
    body?: Record<string, unknown>,
    queryParams?: Record<string, string | number | boolean>,
  ): Promise<BaseResponse<T>> {
    const url = this.buildUrl(endpoint, queryParams);

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return this.handleResponse<T>(response, schema);
  }

  public get<T>(
    endpoint: string,
    schema?: ZodSchema<T>,
    queryParams?: Record<string, string | number | boolean>,
    options?: RequestInit,
  ) {
    return this.request<T>('GET', endpoint, schema, options, undefined, queryParams);
  }

  public post<T, TData extends Record<string, unknown> | undefined>(
    endpoint: string,
    body: TData,
    schema?: ZodSchema<T>,
    options?: RequestInit,
  ) {
    return this.request<T>('POST', endpoint, schema, options, body);
  }

  public put<T, TData extends Record<string, unknown>>(
    endpoint: string,
    body: TData,
    schema?: ZodSchema<T>,
    options?: RequestInit,
  ) {
    return this.request<T>('PUT', endpoint, schema, options, body);
  }

  public delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>('DELETE', endpoint, undefined, options);
  }
}

const apiClientInstance = new ApiClient(BASE_URL);

export default apiClientInstance;
