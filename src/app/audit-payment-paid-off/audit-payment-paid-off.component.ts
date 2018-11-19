import { Component, OnInit } from '@angular/core';
import {Invoice} from '../invoice';
import {Order} from '../order';
import {IncorpStepperService} from '../incorp-stepper.service';
import {OrderService} from '../order.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as CryptoJS from "crypto-js";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-audit-payment-paid-off',
  templateUrl: './audit-payment-paid-off.component.html',
  styleUrls: ['./audit-payment-paid-off.component.sass']
})
export class AuditPaymentPaidOffComponent implements OnInit {
  is_paid: boolean;

  invoice: Invoice;

  order: Order;

  current_url: string;

  values: any = {};

  errors;

  constructor(
    private stepService: IncorpStepperService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.parent.params['orderId'];
    this.current_url = this.router.url;

    // Get the order
    this.stepService
      .loadSteps('audit', id , true)
      .flatMap(() => this.orderService.getOrder(id ))
      .subscribe((o) => {
        this.order.applicationStatus = o.applicationStatus;
        this.stepService.enablesToId(o.applicationStatus);
      });

    // Get invoice details
    this.orderService.getOrderInvoice(id)
      .subscribe((invoice) => {
        this.invoice = invoice;

        let total_amount: number = 0;

        for (let i = 0; i < this.invoice.line_items.length; i++) {
          total_amount += this.invoice.line_items[i].countAmount;
        }

        let return_url: string = this.current_url;

        this.calculateValues(id, total_amount, return_url, 'payment-status-paid-off');

      }, (error) => {
        console.error('Error fetching invoice');
        this.errors = error;
      });

    // only check once during initialization
    this.orderService.getOrder(id)
      .subscribe((order)=>{
        this.order = order;
        if(this.order.paymentStatus.toLowerCase() =='paid_off_success'){ //incomplete=>down=>paid_off
          this.is_paid = true;
        }else{ //no matter incomplete, pending, or fail, all are considered as not paid
          this.is_paid = false;
        }
      }, (error) => {
        console.error('Error fetching order');
      });
  }

  isPaid(){
    return this.is_paid;
  }

  // onPaymentAction(){
  //   console.log('onPaymentAction()');
  //   const id = +this.route.snapshot.parent.params['orderId'];
  //
  //   var items = this.invoice.line_items;
  //
  //   let total_amount: number = 0;
  //
  //   for (let i = 0; i < this.invoice.line_items.length; i++) {
  //     total_amount += this.invoice.line_items[i].countAmount;
  //   }
  //
  //   let return_url: string = this.current_url;
  //   console.log('return_url: ' + return_url);
  //
  //   this.orderService
  //     .sendPayment(id, total_amount, return_url, 'payment-status-paid-off')
  //     .subscribe((res) => {
  //       const response = res as Window;
  //       console.log('send payment fail'); // it is expected that the response cannot be parsed
  //     }, (error) => {
  //       console.log(error.url);
  //       window.location.href = error.url;
  //       console.log('send payment success');
  //     });
  // }

  calculateValues(id: number, amount: number, return_url: string, payment_type: string){
    const callback_url = `${environment.outerBaseUrl}/orders/${id}/${payment_type}`;

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
    this.values = {
      merchant: API_USERNAME,
      //price: amount.toString(),
      price: '0.01', // this is used for testing
      description: 'test connection',
      transaction: transaction,
      return_url: environment.hostBaseUrl + return_url, // after payment, return to current page no matter success or fail
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
      Object.entries(this.values)  // [['merchant','API_USERNAME'],['price','1.0'],['description','applepie']...]
        .map(kv => kv[0] + '=' + kv[1]) // ['merchant=API_USERNAME', 'price=1.0', 'description=applepie'...]
        .sort();  // ['callback_url=https://CALLBACK.URL/HERE', 'currency_code=sgd'...]

    // append shared key to the end of params array
    sortedValues.push('shared_key=' + API_SECRET);

    // concat sorted params array with &
    const signStr = sortedValues.join('&');

    // calculate hex sha256 sum of the string as the signature
    const encryptStr = CryptoJS.SHA256(signStr);

    const signature = encryptStr.toString(CryptoJS.enc.Hex).toLowerCase();

    // add the signature to the original parameter list
    this.values['signature'] = signature;
  }


  toNextStep() {
    const id = +this.route.snapshot.parent.params['orderId'];
    // // 进入下一步
    // const step = this.stepService.step(3);
    // this.orderService
    //   .updateOrderApplicationStatus(id, step.id)
    //   .subscribe(() => {
    //     this.stepService.nagivateToStep(3);
    //   });
    this.stepService.nagivateToStep(3);
  }

}
