import { CoinbaseApiError } from '@/error/index'

export class ServiceUnavailableError extends CoinbaseApiError {

  constructor(data: any) {
    super(503, 'Service unavailable.', data);
  }
}