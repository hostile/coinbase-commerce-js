import { CoinbaseApiError } from '@/error/index';

export class RateLimitedError extends CoinbaseApiError {

  constructor(data: any) {
    super(429, 'You\'re sending requests too fast!', data);
  }
}