import { CoinbaseApiError } from '@/error/index'

export class InternalServerError extends CoinbaseApiError {

  constructor(data: any) {
    super(500, 'Internal server error.', data);
  }
}