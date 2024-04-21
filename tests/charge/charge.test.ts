import { describe, expect, test } from '@jest/globals';
import { Charge, PricingType } from '@/index';

describe('Charge unit tests', () => {
  test('Charge is created successfully', async () => {
    const charge = await Charge.create({
      name: 'Test Charge',
      pricingType: PricingType.None
    });

    expect(charge.id).toBeDefined();
    expect(charge.getPath()).toBeDefined();
  });
});