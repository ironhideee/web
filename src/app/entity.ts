import { autoserializeAs } from 'cerialize';
import { NaturalPerson } from './natural-person';
import { Order } from './order';

export class Entity {
    @autoserializeAs('entity_type')
    entityType: string;

    @autoserializeAs('id')
    id: number;

    @autoserializeAs('incorporation_name')
    name: string;

    @autoserializeAs('is_cn_name')
    isChineseName: boolean;

    @autoserializeAs('is_registered_from_satori')
    is_satori: boolean;

    @autoserializeAs('business_scope')
    businessActivities: string[];

    @autoserializeAs('fiscal_year_end')
    financialYearEnd: string;

    @autoserializeAs('bvi_kit_receiver_contact')
    bviKitReceiverContact: string;

    @autoserializeAs('bvi_kit_receiver_address')
    bviKitReceiverAddress: string;

    @autoserializeAs('number_of_shares')
    numberOfShares: number;

    @autoserializeAs('issued_share_capital')
    valuePerShare: number;

    @autoserializeAs('incorporation_name_backup_1')
    name_backup_1: string;

    @autoserializeAs('incorporation_name_backup_2')
    name_backup_2: string;

    @autoserializeAs('source_of_fund')
    source_of_fund: string;

    @autoserializeAs('business_scope_of_source_of_fund')
    business_scope_of_source_of_fund: string;

    @autoserializeAs('country_of_business')
    country_of_business: string;

    @autoserializeAs('entity_id')
    entity_id: number;

    @autoserializeAs('is_local_director')
    localDirector: string;

    @autoserializeAs('application_status')
    applicationStatus: string;

    @autoserializeAs('primary_type')
    primaryType = 'compliance_solution_incorporation';

    @autoserializeAs(NaturalPerson, 'natural_people')
    naturalPeople: NaturalPerson[];

    @autoserializeAs(Order, 'orders')
    orders: Order[];

    get shortName() {
        const suffix = 'Foundation Ltd.';
        return this.name &&
          this.name.substr(0, this.name.length - suffix.length - 1);
      }

    get PteShortName() {
      const suffix = 'Pte Ltd.';
      return this.name &&
        this.name.substr(0, this.name.length - suffix.length - 1);
    }

    get PteBackUp1ShortName() {
      const suffix = 'Ltd.';
      return this.name_backup_1 &&
        this.name_backup_1.substr(0, this.name_backup_1.length - suffix.length - 1);
    }

    get PteBackUp2ShortName() {
      const suffix = 'Ltd.';
      return this.name_backup_2 &&
        this.name_backup_2.substr(0, this.name_backup_2.length - suffix.length - 1);
    }
}
