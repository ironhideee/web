import { Injectable } from '@angular/core';
// import { Director } from './director';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Serialize, Deserialize } from 'cerialize';
import { Entity } from './entity';
import { NaturalPerson } from './natural-person';
import { BaseService } from './base.service';

@Injectable()
export class IncorpService extends BaseService {

  // TODO: move this to orderService
  addNaturalPerson(orderId: number, director: NaturalPerson): Observable<NaturalPerson> {
    const url = `${this.baseUrl}/orders/${orderId}/natural_people`;
    const payload = Serialize(director);
    // console.log(payload);
    return this.http
      .post(url, payload)
      .map((resp) => Deserialize(resp['result'], NaturalPerson));
  }

  updateNaturalPerson(orderId: number, personId: number, director: NaturalPerson): Observable<NaturalPerson> {
    const url = `${this.baseUrl}/orders/${orderId}/natural_people/${personId}`;
    const payload = Serialize(director);
    // console.log(payload);
    return this.http
      .put(url, payload)
      .map((resp) => Deserialize(resp['result'], NaturalPerson));
  }
}
