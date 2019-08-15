import { Order } from './order';
import { HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable} from '@angular/core';
import { Serialize, Deserialize } from 'cerialize';
import { NaturalPerson } from './natural-person';
import { IncorpGeneratedDocument } from './incorp-generated-document';
import { ServiceItem } from './service-item';
import { Invoice } from './invoice';
import { environment } from '../environments/environment';
import { BaseService } from './base.service';
import * as CryptoJS from "crypto-js";
import { Entity } from './entity';

@Injectable()
export class OrderService extends BaseService {

  getOrders(): Observable<Order[]> {
    const url = `${this.baseUrl}/orders`;
    return this.http
      .get(url)
      .map(resp => Deserialize(resp['orders'], Order));
  }


  createOrder(order: Order, order_type: string, entity_id: number): Observable<Order> {
    const url = `${this.baseUrl}/orders`;
    return this.http
      .post(url, order, {
        params: {
          order_type: order_type,
          entity_id: entity_id.toString()}
      })
      .map(resp => Deserialize(resp['result'], Order));
  }

  createEntity(entity: Entity): Observable<Entity> {
    const url = `${this.baseUrl}/entities`;
    console.log(entity);
    return this.http
      .post(url, Serialize(entity))
      .map(resp => Deserialize(resp['result'], Entity));
  }

  getOrder(id: number): Observable<Order> {
    const url = `${this.baseUrl}/orders/${id}`;
    return this.http
      .get(url)
      .map(resp => Deserialize(resp['result'], Order));
  }

  getAllUserOrders(): Observable<Order[]> {
    const url = `${this.baseUrl}/orders`;
    return this.http
      .get(url)
      .map(resp => Deserialize(resp['orders'], Order));
  }

  getEntity(id: number): Observable<Entity> {
    const url = `${this.baseUrl}/entities/${id}`;
    return this.http
      .get(url)
      .map(resp => Deserialize(resp['result'], Entity));
  }

  // 检查entity name是否重复
  checkEntityName(entity_name: string, id: number): Observable<Array<string>> {
    const url = `${this.baseUrl}/check-entity-name/${id}`;
    return this.http
      .post(url, entity_name, {
        params: { entity_name: entity_name }
      })
      .map(resp => Deserialize(resp['result'], Array));
  }

  // 提交注册码
  applyDiscount(discount_code: string, id: number): Observable<Order> {
    const url = `${this.baseUrl}/orders/${id}/discount`;
    return this.http
      .post(url, discount_code, {
        params: { discount_code: discount_code }
      })
      .map(resp => Deserialize(resp['result'], Order));
  }

  // 获取制定natural-person信息
  getNaturalPerson(orderId: number, personId: number): Observable<NaturalPerson> {
    const url = `${this.baseUrl}/orders/${orderId}/natural_people/${personId}`;
    return this.http
      .get(url)
      .map((resp) => Deserialize(resp['result'], NaturalPerson));
  }

  // 向api传tokens
  applyPaymentToken(orderId: number, id: string): Observable<Order> {
    const url = `${this.baseUrl}/orders/${orderId}/payment-status-one-time/stripe`;
    return this.http
      .post(url, id, {
        params: { stripeToken: id }
      })
      .map((resp) => Deserialize(resp['result'], Order));
  }

  /**
   * Update the Order
   *
   * @param entity the new order to replace the record with the same ID
   */

  updateAddressType(d: NaturalPerson, proofType: string): Observable<NaturalPerson> {
    const url = `${environment.apiBaseUrl}/natural-people/${d.id}/address-proof-type`;
    return this.http
      .post(url, {address_proof_type: proofType})
      .map(resp => Deserialize(resp['result'], NaturalPerson));
  }

  updateEntity(entity: Entity): Observable<Entity> {
    const url = `${this.baseUrl}/entities/${entity.id}`;
    return this.http
      .put(url, Serialize(entity))
      .map(resp => Deserialize(resp['result'], Entity));
  }

  updateQty(id: number, qty: number, skuId: number): Observable<Entity> {
    const url = `${this.baseUrl}/orders/${id}/services/${skuId}`;
    return this.http
      .put(url, {qty: qty})
      .map(resp => Deserialize(resp['result'], Entity));
  }

  removeNaturalPerson(np: NaturalPerson): Observable<any> {
    const url = `${this.baseUrl}/natural-people/${np.id}`;
    return this.http.delete(url);
  }

  createServiceItemOrder(id: number, selectedSkuIds: number[]): Observable<ServiceItem[]> {
    const url = `${this.baseUrl}/orders/${id}/services`;
    return this.http
      .post(url, { selected_sku_ids: selectedSkuIds })
      .map(resp => Deserialize(resp['result'], ServiceItem));
  }

  getOneOrder(id: number): Observable<Entity> {
    const url = `${this.baseUrl}/orders/${id}`;
    return this.http
      .get(url)
      .map(resp => Deserialize(resp['result'], Entity));
  }

  getOrderInvoice(id: number): Observable<Invoice> {
    const url = `${this.baseUrl}/orders/${id}/invoice`;
    return this.http
      .get(url)
      .map(resp => Deserialize(resp, Invoice));
  }

  updateOrderApplicationStatus(id: number, status: string): Observable<Order> {
    const url = `${this.baseUrl}/orders/${id}/application-status`;

    return this.http
      .put(url, { status })
      .map(resp => Deserialize(resp['result'], Order));
  }

  updateOrderPaymentStatus(id: number, status: string): Observable<Order> {
    const url = `${this.baseUrl}/orders/${id}/payment-status`;

    return this.http
      .put(url, { status })
      .map(resp => Deserialize(resp['result'], Order));
  }

  // pdf related
  generateIncorpPDF(id: number, type: string, selectedSkuIds: number[]): Observable<IncorpGeneratedDocument> {
    if (type === 'clg_registration_form') {
      const url = `${this.baseUrl}/orders/${id}/pdf_generation/clg_registration_form`;
      return this.http
        .put(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if (type === 'clg_engagement_letter') {
      const url = `${this.baseUrl}/orders/${id}/pdf_generation/clg_engagement_letter`;
      return this.http
        .put(url, { selected_sku_ids: selectedSkuIds })
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if (type === 'annual_renewal_contract') {
      const url = `${this.baseUrl}/orders/${id}/pdf_generation/annual_renewal_contract`;
      return this.http
        .put(url, { selected_sku_ids: selectedSkuIds })
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if (type === 'plc_registration_form') {
      const url = `${this.baseUrl}/orders/${id}/pdf_generation/plc_registration_form`;
      return this.http
        .put(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if (type === 'plc_engagement_letter') {
      const url = `${this.baseUrl}/orders/${id}/pdf_generation/plc_engagement_letter`;
      return this.http
        .put(url, { selected_sku_ids: selectedSkuIds })
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if (type === 'plc_bvi_basic_info') {
      const url = `${this.baseUrl}/orders/${id}/pdf_generation/plc_bvi_basic_info`;
      return this.http
        .put(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else {
      // To-do: add other types later
      return null;
    }
  }

  downloadIncorpPDF(id: number, type: string): Observable<IncorpGeneratedDocument> {
    if(type === 'clg_engagement_letter'){
      const url = `${this.baseUrl}/orders/${id}/clg_engagement_letter`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'clg_registration_form'){
      const url = `${this.baseUrl}/orders/${id}/clg_registration_form`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'clg_bizfile'){
      const url = `${this.baseUrl}/orders/${id}/clg_bizfile`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'clg_constitution'){
      const url = `${this.baseUrl}/orders/${id}/clg_constitution`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'clg_certificate'){
      const url = `${this.baseUrl}/orders/${id}/clg_certificate`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'audit_bizfile'){
      const url = `${this.baseUrl}/orders/${id}/audit_bizfile`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'audit_constitution'){
      const url = `${this.baseUrl}/orders/${id}/audit_constitution`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'audit_contract'){
      const url = `${this.baseUrl}/orders/${id}/audit_contract`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'auditor_appointed_contract'){
      const url = `${this.baseUrl}/orders/${id}/auditor_appointed_contract`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'audit_bizfile'){
      const url = `${this.baseUrl}/orders/${id}/audit_bizfile`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'legal_opinion'){
      const url = `${this.baseUrl}/orders/${id}/legal_opinion`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'annual_renewal_contract'){
      const url = `${this.baseUrl}/orders/${id}/annual_renewal_contract`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'directors_resolution'){
      const url = `${this.baseUrl}/orders/${id}/directors_resolution`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'annual_renewal_updated_bizfile'){
      const url = `${this.baseUrl}/orders/${id}/annual_renewal_updated_bizfile`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'plc_registration_form'){
      const url = `${this.baseUrl}/orders/${id}/plc_registration_form`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'plc_engagement_letter'){
      const url = `${this.baseUrl}/orders/${id}/plc_engagement_letter`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'plc_bizfile'){
      const url = `${this.baseUrl}/orders/${id}/plc_bizfile`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'plc_constitution'){
      const url = `${this.baseUrl}/orders/${id}/plc_constitution`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else if(type === 'plc_certificate'){
      const url = `${this.baseUrl}/orders/${id}/plc_certificate`;
      return this.http
        .get(url, {})
        .map(resp => Deserialize(resp['result'], IncorpGeneratedDocument));
    }
    else{
      //To-do: add other types later
      return null;
    }
  }

  // 这个已经没有在用了
  sendPayment(id: number, amount: number, return_url: string, payment_type: string): Observable<any> {
// payment_type can be: payment-status-one-time, payment-status-paid-off, payment-status-down
    const callback_url = `${this.outerBaseUrl}/orders/${id}/${payment_type}`;

    var randomHex = require('randomhex');

    // replace with your own credentials from
    // https://gateway.fomopay.com/web/merchant/configurations
    const API_USERNAME = '00085635';
    const API_SECRET = 'GqsDjq7WcUkYcBcWqQc7KKuoA9oj3Y6ZMaXkcG9jeAQodd7FYEkBSWZw03jiDaOJBLxDxoYgSJLKqGCQxv5UMAa';

    // use your own unique transaction ID
    let transaction = randomHex(8);
    // generate a unique random nonce
    let nonce = randomHex(8);


    // parameters according to documents
    const values = {
      merchant: API_USERNAME,
      //price: amount.toString(),
      price: '0.01', // this is used for testing
      description: 'test connection',
      transaction: transaction,
      return_url: this.hostBaseUrl + return_url, // after payment, return to current page no matter success or fail
      callback_url: callback_url,
      currency_code: 'sgd',
      type: 'sale',
      timeout: '3600',
      nonce: nonce
    };

    //console.log(values);

    // convert parameters to the form of 'key=value'
    // and sort them lexicographically
    const sortedValues =
      Object.entries(values)  // [['merchant','API_USERNAME'],['price','1.0'],['description','applepie']...]
        .map(kv => kv[0] + '=' + kv[1]) // ['merchant=API_USERNAME', 'price=1.0', 'description=applepie'...]
        .sort();  // ['callback_url=https://CALLBACK.URL/HERE', 'currency_code=sgd'...]

    // append shared key to the end of params array
    sortedValues.push('shared_key=' + API_SECRET);

    // concat sorted params array with &
    const signStr = sortedValues.join('&');
    // 'callback_url=https://CALLBACK.URL/HERE&currency_code=sgd&description=...'

    // calculate hex sha256 sum of the string as the signature

    const encryptStr = CryptoJS.SHA256(signStr);

    const signature = encryptStr.toString(CryptoJS.enc.Hex).toLowerCase();

    // add the signature to the original parameter list
    values['signature'] = signature;

    //console.log("signature: " + signature);

    // post the parameters to the api,
    // in the format of application/x-www-form-urlencoded

    const gate_url = 'https://gateway.fomopay.com/pgw/v1';

    //console.log(values);

    let body = new HttpParams();

    for(var value in values){
      body = body.set(value, values[value]);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    // //console.log(body.keys().toString());
    // const formData = new FormData();
    // for(var value in values){
    //   formData.append(value, values[value]);
    // }


    return this.http.post(gate_url, body, httpOptions);
    // return this.http.post(gate_url, formData, httpOptions);
  }
}
