import { LocalPrice, PricingType } from '@/types/pricing';
import { CustomerInfo } from '@/types/customer';

import { ApiResource } from '@/resource/index';
import {
  DeleteMethod,
  ListMethod,
  RetrieveMethod,
  SaveMethod,
  UpdateMethod,
} from '@/method';

export interface CheckoutMeta extends NodeJS.Dict<any> {
  name: string;
  pricingType: PricingType;
  localPrice?: LocalPrice;
  description?: string;
  requestedInfo?: CustomerInfo[]
}

export class Checkout extends ApiResource implements
  CheckoutMeta,
  DeleteMethod,
  ListMethod,
  RetrieveMethod,
  SaveMethod,
  UpdateMethod
{

  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly pricingType: PricingType;

  public constructor(data?: { data: NodeJS.Dict<any> } | CheckoutMeta) {
    super(data);
  }

  public getPath(): string {
    return '/checkouts/' + (!this.id ? '' : this.id);
  }

  public getUrl(): string {
    return `https://commerce.coinbase.com/checkouts/${this.id}`;
  }

  public async delete(): Promise<this> {
    return super.delete();
  }

  public async list(): Promise<this[]> {
    return super.list().then((results) =>
      results.map(result => new Checkout(result)) as this[]);
  }

  public async retrieve(): Promise<this> {
    return super.retrieve();
  }

  public async save(): Promise<this> {
    return super.save();
  }

  public async update(): Promise<this> {
    return super.update();
  }

  public static async retrieve(data: NodeJS.Dict<any> & { id: string }): Promise<Checkout> {
    return new Checkout({data}).retrieve();
  }

  public static async create(data: Omit<CheckoutMeta, 'id'>): Promise<Checkout> {
    return new Checkout({data}).retrieve();
  }
}
