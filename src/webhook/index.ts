import crypto, { Encoding } from 'crypto';

import { config } from '@/client';

export type HeadersLike = {
  'X-CC-Webhook-Signature': string
};

export type RequestLike = {
  body: string,
  headers: HeadersLike
};

export function verifyHeaderWebhookSignature(
  payload: string,
  headers: HeadersLike
): boolean {
  return verifyWebhookSignature(payload, headers['X-CC-Webhook-Signature'])
}

export function verifyRequestWebhookSignature(
  request: RequestLike
): boolean {
  return verifyHeaderWebhookSignature(request.body, request.headers);
}

export function verifyWebhookSignature(
  payload: string,
  signatureHeader: string
): boolean {
  const signature = calculateSignature(payload);

  return compare(signature, signatureHeader);
}

export function compare(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a.charAt(i) !== b.charAt(i)) {
      return false;
    }
  }

  return true;
}

export function calculateSignature(payload: string, encoding: Encoding = 'utf-8'): string {
  return crypto.createHmac('sha256', config.webhookSecret)
    .update(payload, encoding)
    .digest('hex');
}