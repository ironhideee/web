import { autoserializeAs, autoserialize } from 'cerialize';

export class ServiceItem {

    @autoserialize
    id: string;

    @autoserializeAs('sku_id')
    skuId: string;

    @autoserialize
    name: string;

    @autoserialize
    cost: string;

    @autoserializeAs('description_cn')
    descriptionCn: string;

    @autoserializeAs('cost_amount')
    costAmount: number;

    @autoserializeAs('cost_code')
    costCode: number;

}
