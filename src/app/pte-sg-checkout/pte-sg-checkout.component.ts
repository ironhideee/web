import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Order} from '../order';
import {Invoice} from '../invoice';
import {IncorpStepperService} from '../incorp-stepper.service';
import { MatDialog } from '@angular/material';
import * as CryptoJS from 'crypto-js';
import * as jsPDF from 'jspdf';
import {IncorpGeneratedDocument} from '../incorp-generated-document';

@Component({
  selector: 'app-pte-sg-checkout',
  templateUrl: './pte-sg-checkout.component.html',
  styleUrls: ['./pte-sg-checkout.component.sass']
})
export class PteSgCheckoutComponent implements OnInit {

  invoice: Invoice;

  order: Order;

  orderId: number;

  price_paid: number;

  loading = true;

  generating = false;

  current_url: string;

  ifSuccess: boolean;

  is_paid: boolean;

  dueDate: string;

  values: any = {};

  errors;

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dialog: MatDialog,
    private router: Router) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    const id = +this.route.snapshot.parent.params['orderId'];
    this.current_url = this.router.url;

    // Get invoice details
    this.orderService.getOrderInvoice(id)
      .subscribe((invoice) => {
        this.invoice = invoice;
        this.loading = false;
      }, (error) => {
        console.error('Error fetching invoice');
        this.loading = false;
        this.errors = error;
      });

    // only check once during initialization
    this.orderService.getOrder(id)
      .subscribe((order) => {
        this.order = order;
        // 支付日期
        console.log('支付日期' + order.paymentDate);
        const date = new Date(order.paymentDate);
        // console.log('处理过的时间' + date);
        date.setDate(date.getDate() + 15);
        this.dueDate = date.toString();
        // console.log('15天后的日期' + this.dueDate);
        // 支付信息
        const discount: number = this.order.percentage;
        const total_amount: number = this.order.amountCost;
        console.log( '未打折的订单金额：' + total_amount);
        const payment_amount: number = total_amount * (1 - discount / 100);
        this.price_paid = payment_amount;
        console.log( '未打折的支付金额：' + payment_amount);
        const return_url: string = this.current_url;
        this.calculateValues(id, payment_amount, return_url, 'payment-status-one-time');
        if (this.order.applicationStatus === 'legal_success') {
          this.ifSuccess = true;
        } else {
          this.ifSuccess = false;
        }
        if (this.order.paymentStatus.toLowerCase() === 'success') {
          this.is_paid = true;
        } else { // no matter incomplete, pending, or fail, all are considered as not paid
          this.is_paid = false;
        }
      }, (error) => {
        console.error('Error fetching order');
      });
  }

  isPaid() {
    return this.is_paid;
  }

  getIfSuccess() {
    return this.ifSuccess;
  }

  onSubmitDiscount(discount_code: string) {
    this.orderService
      .applyDiscount(discount_code, this.orderId)
      .subscribe((data) => {
        this.order = data;
        const discount: number = this.order.percentage;
        const total_amount: number = this.order.amountCost;
        const payment_amount: number = total_amount * (1 - discount / 100);
        this.price_paid = payment_amount;
        console.log('打完折的价格为' + payment_amount);
        const return_url: string = this.current_url;
        this.calculateValues(this.order.id, payment_amount, return_url, 'payment-status-one-time');
      }, (error) => {
        console.log(error.error.msg);
        if (error.error.msg.includes('The discount code is disabled')) {
          this.errors = '您输入的注册码已被禁用，请联系客户经理获取有效注册码';
        } else if (error.error.msg.includes('The discount code is not valid')) {
          this.errors = '您输入的注册码有误，请联系客户经理获取有效注册码';
        } else if (error.error.msg.includes('The discount code is expired')) {
          this.errors = '您输入的注册码已过期，请联系客户经理获取有效注册码';
        } else if (error.error.msg.includes('The discount code is already used')) {
          this.errors = '您输入的注册码已被使用，请联系客户经理重新获取注册码';
        }
      });
  }

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
      // price: amount.toFixed(2).toString(),
      price: '0.01', // this is used for testing
      description: 'test connection',
      transaction: transaction,
      return_url: environment.hostBaseUrl + return_url, // after payment, return to current page no matter success or fail
      callback_url: callback_url,
      currency_code: 'usd',
      type: 'sale',
      timeout: '3600',
      nonce: nonce
    };
    console.log(this.values.price);

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

    // 生成文档
    this.generating = true;

    let generatingPLC: boolean = true;
    let generatingLetter: boolean = true;

    this.orderService
      .generateIncorpPDF(id, 'plc_registration_form', null)
      .subscribe((CLG: IncorpGeneratedDocument) => {
        generatingPLC = false;
        this.generating = generatingPLC || generatingLetter;
      }, (error) => {
        generatingPLC = false;
        this.generating = generatingPLC || generatingLetter;
        console.error('Generated PLC form PDF failed: ', error);
      });

    let sku_ids: number[] = [];
    for (let i = 0; i < this.invoice.line_items.length; i++) {
      sku_ids.push(this.invoice.line_items[i].skuId);
    }

    this.orderService
      .generateIncorpPDF(id, 'plc_engagement_letter', sku_ids)
      .subscribe((letter: IncorpGeneratedDocument) => {
        generatingLetter = false;
        this.generating = generatingPLC || generatingLetter;
      }, (error) => {
        generatingLetter = false;
        this.generating = generatingPLC || generatingLetter;
        console.error('Generated engagement letter PDF failed: ', error);
      });

    // 进入下一步
    const step = this.stepService.step(4);
    this.orderService
      .updateOrderApplicationStatus(id, step.id)
      .subscribe(() => {
        this.stepService.nagivateToStep(4);
      });
  }

  public download() {
    document.getElementById('invoice').style.cssText = 'display: block';
    const elementToPrint = document.getElementById('invoice');
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addHTML(elementToPrint, () => {
      pdf.save('invoice.pdf');
      document.getElementById('invoice').style.cssText = 'display: none';
    });
  }

}
