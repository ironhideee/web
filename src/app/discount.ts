import { autoserializeAs } from 'cerialize';

export class Discount {
  @autoserializeAs('discount_code')
  discountCode: string;

  @autoserializeAs('discount_percentage')
  percentage: number;

  @autoserializeAs('order_id')
  orderId: number;

  @autoserializeAs('date_created')
  createTime: string;

  @autoserializeAs('date_expired')
  expiredTime: string;

  @autoserializeAs('is_used')
  isUsed: boolean;

  @autoserializeAs('is_disabled')
  isDisabled: boolean;

  @autoserializeAs('order_type')
  order_type: string;
}
