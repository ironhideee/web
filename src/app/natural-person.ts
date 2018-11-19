import { autoserialize, autoserializeAs } from 'cerialize';
import { isDeepStrictEqual } from 'util';

export class NaturalPerson {

    @autoserializeAs('id')
    id: number;

    @autoserialize
    name: string;

    @autoserialize
    address: string;

    @autoserializeAs('collateral_amount')
    collateralAmount: number;

    @autoserializeAs('guarantee_amount')
    guaranteeAmount: number;

    @autoserialize
    email: string;

    @autoserializeAs('passport_number')
    passportNumber: string;

    @autoserialize
    phone: string;

    @autoserialize
    working_time: string;

    // @autoserializeAs('role_type')
    // roleType: string;

    @autoserialize
    share: string;

    @autoserializeAs('address_proof_type')
    addressProofType: string;

    @autoserializeAs('passport_url')
    passportUrl: string;

    @autoserializeAs('address_proof_front_url')
    addressProofFrontUrl: string;

    @autoserializeAs('address_proof_back_url')
    addressProofBackUrl: string;

    @autoserializeAs('is_danger')
    isPoliticallyDangerous: boolean;

    @autoserializeAs('is_director')
    isDirector: boolean;

    @autoserializeAs('is_member')
    isMember: boolean;

    @autoserializeAs('is_shareholder')
    isShareHolder: boolean;

    @autoserializeAs('order_type')
    orderType: string;

    @autoserializeAs('share_percentage')
    percentage: number;

    @autoserializeAs('current_employer_company')
    current_employer_company: string;

    @autoserializeAs('current_occupation')
    current_occupation: string;

    @autoserialize
    birthday: string;

    @autoserialize
    nationality: string;

    constructor(
        name: string, percentage: number, email:string, phone:string, working_time: string, passportId: string,
        address: string, guaranteeAmount: number,
        isPoliticallyDangerous: boolean,
        birthday: string, nationality: string, isDirector: boolean, isMember: boolean, isShareHolder: boolean,
        current_employer_company: string, current_occupation:string
    ) {
        this.name = name;
        this.percentage = percentage;
        this.email = email;
        this.phone = phone;
        this.working_time = working_time;
        this.passportNumber = passportId;
        this.address = address;
        this.guaranteeAmount = guaranteeAmount;
        this.isPoliticallyDangerous = isPoliticallyDangerous;
        this.birthday = birthday;
        this.nationality = nationality;
        this.isDirector = isDirector;
        this.isMember = isMember;
        this.isShareHolder = isShareHolder;
        this.current_employer_company = current_employer_company;
        this.current_occupation = current_occupation;
    }

    partiallyUpdate(fileType: string, newDirector: NaturalPerson): void {
        const mappings = {
            image_passport: 'passportUrl',
            image_address_proof_front: 'addressProofFrontUrl',
            image_address_proof_back: 'addressProofBackUrl',
        };

        const updatedKey = mappings[fileType];

        this[updatedKey] = newDirector[updatedKey];
    }

}
