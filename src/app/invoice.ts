import { ServiceItem } from './service-item';
import { LineItem } from './line-item';
import { autoserialize, autoserializeAs } from 'cerialize';

export class Invoice {

    @autoserialize
    id: number;

    @autoserializeAs(ServiceItem)
    services: ServiceItem[];

    @autoserializeAs(LineItem)
    line_items: LineItem[];

    @autoserializeAs('payment_methods')
    paymentMethods;



}
