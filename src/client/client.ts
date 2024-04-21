import axios, { AxiosInstance, AxiosResponseHeaders } from 'axios';

import {
  InternalServerError,
  InvalidRequestError,
  RateLimitedError,
  ResourceNotFoundError,
  UnauthenticatedError
} from '@/error';

export interface Config {
  apiKey: string;
  timeout?: number;
  organizationName?: string;
  webhookSecret?: string;
  redirects?: NodeJS.Dict<string>;
}

export let config: Config = null;

export function configure(paramConfig: Config): void {
  config = paramConfig;
}

export function http(): AxiosInstance {
  /*
  The Coinbase Commerce API version header is not required, but the API
  will return a warning if it is missing, so we'll include it for now.
 */

  return axios.create({
    baseURL: 'https://api.commerce.coinbase.com',
    headers: {
      'X-CC-Api-Key': config.apiKey,
      'X-CC-Version': '2018-03-22'
    },
    timeout: config.timeout,
    transformResponse: (data: any, _headers: AxiosResponseHeaders, status: number) => {
      switch (status) {
        case 400:
          throw new InvalidRequestError(data);
        case 401:
          throw new UnauthenticatedError(data);
        case 404:
          throw new ResourceNotFoundError(data);
        case 429:
          throw new RateLimitedError(data);
        case 500:
          throw new InternalServerError(data);
        case 503:
          throw new InvalidRequestError(data);
      }

      return JSON.parse(data);
    }
  });
}
