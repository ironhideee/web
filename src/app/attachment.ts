import { autoserializeAs, autoserialize } from 'cerialize';

export class AttachmentItem {
  @autoserializeAs('file_name')
  fileName: string;

  @autoserializeAs('file_type')
  fileType: string;
}
