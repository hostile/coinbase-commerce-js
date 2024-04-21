import { CoinbaseApiError } from '@/error/index'

export class InvalidRequestError extends CoinbaseApiError {

  constructor(data: any) {
    super(400, 'Invalid request.', data, true);
  }
}