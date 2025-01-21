import type { BaseResponse } from "./types";

import { BASE_URL } from "../constants/baseUrl";

class ApiClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  private async handleResponse<T>(
    response: Response
  ): Promise<BaseResponse<T>> {
    if (!response.ok) {
      throw new Error(`HTTP error. Status Code: ${response.status}`);
    }

    try {
      const result = await response.json();

      return result;
    } catch (error) {
      console.warn("Error parsing JSON response:", error);
      throw new Error("Error parsing JSON response");
    }
  }

  private buildUrl(
    endpoint: string,
    queryParams?: Record<string, string | number | boolean>
  ): string {
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
    options?: RequestInit,
    body?: Record<string, unknown>,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<BaseResponse<T>> {
    const url = this.buildUrl(endpoint, queryParams);

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  public get<T>(
    endpoint: string,
    queryParams?: Record<string, string | number | boolean>,
    options?: RequestInit
  ) {
    return this.request<T>("GET", endpoint, options, undefined, queryParams);
  }

  public post<T, TData extends Record<string, unknown>>(
    endpoint: string,
    body: TData,
    options?: RequestInit
  ) {
    return this.request<T>("POST", endpoint, options, body);
  }

  public put<T, TData extends Record<string, unknown>>(
    endpoint: string,
    body: TData,
    options?: RequestInit
  ) {
    return this.request<T>("PUT", endpoint, options, body);
  }

  public delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>("DELETE", endpoint, options);
  }
}

const apiClientInstance = new ApiClient(BASE_URL);

export default apiClientInstance;
