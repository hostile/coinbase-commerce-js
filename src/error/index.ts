export abstract class CoinbaseApiError extends Error {

  protected constructor(statusCode: number, message: string, data: any, makeIssue: boolean = false, ) {
    super(`Coinbase returned error code ${statusCode}! ${message} ${makeIssue ?
      "Please open an issue with this error.": ""}\n${data}`);
  }
}

export * from './internal_server_error';
export * from './invalid_request';
export * from './ratelimited';
export * from './resource_not_found';
export * from './service_unavailable';
export * from './unauthenticated';
