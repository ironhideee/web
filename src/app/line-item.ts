import { autoserializeAs, autoserialize } from 'cerialize';

export class LineItem {

    @autoserializeAs('sku_id')
    skuId: number;

    @autoserializeAs('description')
    descriptionStr: string;

    @autoserializeAs('description_CN')
    descriptionStrCN: string;

    @autoserializeAs('unit_cost_amount')
    countAmount: number;
}
