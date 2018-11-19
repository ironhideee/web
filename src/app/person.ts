import { autoserializeAs } from 'cerialize';

/**
 * Legal person
 */
export class Person {
  @autoserializeAs('id')
  id: number;

  @autoserializeAs('first_name')
  firstName: string;

  @autoserializeAs('last_name')
  lastName: string;

  @autoserializeAs('nationality')
  nationality: string;

  @autoserializeAs('email')
  email: string;

  @autoserializeAs('phone')
  phone: string;

}
