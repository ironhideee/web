import { autoserializeAs } from 'cerialize';

/**
 * Identity document for legal person
 */
export class IdentityDocument {
  @autoserializeAs('id')
  id: number;

  @autoserializeAs('personId')
  person_id: number;

  @autoserializeAs('type')
  type: 'id_card' | 'passport';

  @autoserializeAs('ossKey')
  oss_key: string;

  @autoserializeAs('gdocsPath')
  gdocs_path: string;

  @autoserializeAs('status')
  status: 'requesting' | 'submitted' | 'approved' | 'invalid';

}
