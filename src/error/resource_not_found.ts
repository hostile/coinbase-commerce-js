import { CoinbaseApiError } from '@/error/index'

export class ResourceNotFoundError extends CoinbaseApiError {

  constructor(data: any) {
    super(404, 'Resource not found.', data, true);
  }
}