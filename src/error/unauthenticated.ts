import { CoinbaseApiError } from '@/error/index'

export class UnauthenticatedError extends CoinbaseApiError {

  constructor(data: any) {
    super(401, 'Unauthenticated.', data);
  }
}