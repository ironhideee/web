import {autoserialize, autoserializeAs} from 'cerialize';
import {ServiceItem} from './service-item';
import {until} from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;
import { NaturalPerson } from './natural-person';
import {AttachmentItem} from './attachment';

export class Order {

  @autoserializeAs('order_type')
  orderType: string;

  @autoserializeAs('id')
  id: number;

  @autoserializeAs('entity_id')
  entity_id: number;

  @autoserializeAs('entity_type')
  entity_type: string;

  @autoserializeAs('user_id')
  user_id: number;

  @autoserializeAs('application_status')
  applicationStatus: string;

  @autoserializeAs('is_registered_from_satori')
  is_satori: boolean;

  @autoserializeAs('payment_status')
  paymentStatus: string;

  @autoserializeAs('cost_amount')
  amountCost: number;

  @autoserializeAs('cost_code')
  costCode: number;

  @autoserializeAs('date_created')
  createTime: string;

  @autoserializeAs('date_modified')
  modifyTime: string;

  @autoserializeAs('payment_success_date')
  paymentDate: string;

  @autoserializeAs('incorporation_name')
  incorporationName: string;

  @autoserializeAs('discount_percentage')
  percentage: number;

  @autoserializeAs(NaturalPerson, 'natural_people')
  naturalPeople: NaturalPerson[];

  @autoserializeAs(ServiceItem)
  services: ServiceItem[];

  @autoserializeAs(AttachmentItem)
  attachments: AttachmentItem[];
}
