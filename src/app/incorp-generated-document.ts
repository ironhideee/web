import { autoserializeAs } from 'cerialize';

/**
 * Identity document for legal person
 */
export class IncorpGeneratedDocument {
  @autoserializeAs('id')
  id: number;

  @autoserializeAs('incorporation_id')
  incorpId: number;

  @autoserializeAs('user_id')
  userId: number;

  @autoserializeAs('file_type')
  type: 'clg_registration_form' | 'PLC' | 'clg_engagement_letter';

  @autoserializeAs('file_url')
  url: string;

  @autoserializeAs('file_name')
  name: string;
}
