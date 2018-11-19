import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../order';
import {IncorpStepperService} from '../incorp-stepper.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Entity} from '../entity';
import {Invoice} from '../invoice';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-renewal-cart',
  templateUrl: './renewal-cart.component.html',
  styleUrls: ['./renewal-cart.component.sass']
})
export class RenewalCartComponent implements OnInit {

  form: FormGroup;

  order: Order;

  entity: Entity;

  invoice: Invoice;

  ifSuccess: boolean;

  isPaid: boolean;

  subtotal = 0;

  selectedSkuIds: number[];
  // PLC还没做，这里统一按clg处理
  pricing = {
    CLG_localSecretaryFee: {
      skuId: 1002,
      price: 1200,
      recurrence: false
    },
    CLG_localDirectorFee: {
      skuId: 1003,
      price: 5000,
      recurrence: false
    },
  };
  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.parent.params['orderId'];
    this.form = this.fb.group({
      // To-Do, if there exsting user selections, load from selections instead
      // Besides, if user has already paid, it should load from line_items of invoice
      CLG_localSecretaryFee: [false],
      CLG_localDirectorFee: [false],
    });

    // only check once during initialization
    this.orderService.getOrder(id)
      .subscribe((order) => {
        this.order = order;
        if (this.order.applicationStatus === 'annual_success') {
          this.ifSuccess = true;
        } else {
          this.ifSuccess = false;
        }
        if (this.order.paymentStatus.toLowerCase() === 'success') {
          this.isPaid = true;
        } else { // no matter incomplete, pending, or fail, all are considered as not paid
          this.isPaid = false;
        }

        // 用户可以查看之前的选择项目
        this.orderService.getOrderInvoice(id)
          .subscribe((invoice) => {
            this.invoice = invoice;
            const paidItems  = invoice.line_items;
            const paidIds = [];

            for (const item of paidItems) {
              paidIds.push(item.skuId);
            }

            const formItems = this.form.value;
            for (const k in formItems) {
              if (!formItems[k]) {
                if (paidIds.includes(this.pricing[k]['skuId'])) {
                  this.form.get(k).setValue(true);
                }
              }
            }
          }, (error) => {
            console.error('Error fetching invoice');
          });
      }, (error) => {
        console.error('Error fetching order');
      });

    this.updateSubtotal();

    this.form.valueChanges
      .subscribe(_ => this.updateSubtotal());
  }

  getIsPaid() {
    return this.isPaid;
  }

  getIfSuccess() {
    return this.ifSuccess;
  }

  updateSubtotal() {
    // reset subtotal
    this.subtotal = 0;
    // this.recurrencePaymentSubtotal = 0;

    const selected = [];

    // recaculate the subtotal
    const lineItems = this.form.value;
    for (const k in lineItems) {
      if (lineItems[k]) {
        // line item has been selected
        this.subtotal += this.pricing[k]['price'];
        selected.push(this.pricing[k].skuId);
      }
    }

    this.selectedSkuIds = selected;
  }

  doCheckout() {
    const id = +this.route.parent.snapshot.params['orderId'];

    this.orderService.createServiceItemOrder(id, this.selectedSkuIds)
      .flatMap((data) => {
        const step = this.stepService.step(2);
        return this.orderService
          .updateOrderApplicationStatus(id, step.id);
      })
      .subscribe((data) => {
        this.stepService.nagivateToStep(2);
      }, () => {
        console.error('Create entity services failed');
      });
  }

}
