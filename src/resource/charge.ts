import { LocalPrice, PricingType } from '@/types/pricing';
import { TransactionState, TimelineElement } from '@/types/transaction';
import { CustomerInfo } from '@/types/customer';

import { ApiResource } from '@/resource/index';
import {
  ListMethod,
  RetrieveMethod,
  SaveMethod,
} from '@/method';

export interface ChargeMeta extends NodeJS.Dict<any> {
  name: string;
  pricingType: PricingType;
  localPrice?: LocalPrice;
  description?: string;
  metadata?: NodeJS.Dict<string>;
  requestedInfo?: CustomerInfo[]
}

export class Charge extends ApiResource implements
  ChargeMeta,
  ListMethod,
  RetrieveMethod,
  SaveMethod
{

  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly pricingType: PricingType;

  public timeline: TimelineElement[];
  public state: TransactionState;

  public constructor(data?: { data: NodeJS.Dict<any> } | ChargeMeta) {
    super(data);
  }

  public getPath(): string {
    return '/charges/' + (!this.id ? '' : this.id);
  }

  public async list(): Promise<this[]> {
    return super.list();
  }

  public async retrieve(): Promise<this> {
    return super.retrieve().then(() => {
      this.state = this.timeline[this.timeline.length - 1].status;
      return this;
    });
  }

  public async save(): Promise<this> {
    return super.save();
  }

  public static async retrieve(data: NodeJS.Dict<any> & { id: string }): Promise<Charge> {
    return new Charge(data as ChargeMeta & { id: string }).retrieve();
  }

  public static async create(data: Omit<ChargeMeta, 'id'>): Promise<Charge> {
    return new Charge(data as ChargeMeta).save();
  }
}
