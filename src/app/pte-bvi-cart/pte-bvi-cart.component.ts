import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Order} from '../order';
import {Entity} from '../entity';
import {Invoice} from '../invoice';
import {IncorpStepperService} from '../incorp-stepper.service';

@Component({
  selector: 'app-pte-bvi-cart',
  templateUrl: './pte-bvi-cart.component.html',
  styleUrls: ['./pte-bvi-cart.component.sass']
})
export class PteBviCartComponent implements OnInit {

  form: FormGroup;

  orderId: number;

  order: Order;

  entity: Entity;

  invoice: Invoice;

  ifSuccess: boolean;

  isPaid: boolean;

  qty: number;

  subtotal = 0;

  selectedSkuIds: number[];

  pricing = {
    BVI_incorporationFee: {
      skuId: 1201,
      price: 3000
    },
    BVI_shareholderDirectorDocFee: {
      skuId: 1202,
      price: 500
    },
  };


  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    const id = +this.route.snapshot.parent.params['orderId'];
    this.form = this.fb.group({
      BVI_incorporationFee: [true],
      BVI_shareholderDirectorDocFee: [true],
    });

    // only check once during initialization
    this.orderService.getOrder(id)
      .subscribe((order) => {
        this.order = order;
        this.qty = order.naturalPeople.length;
        this.orderService.updateQty(this.orderId, this.qty, 1202)
          .subscribe((data) => {
            console.log(data);
          });
        if (this.order.applicationStatus === 'incorp_success') {
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
        this.updateSubtotal();
      }, (error) => {
        console.error('Error fetching order');
      });



    // this.form.valueChanges
    //   .subscribe(_ => this.updateSubtotal());
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

    const selected = [];

    // recaculate the subtotal
    const lineItems = this.form.value;
    for (const k in lineItems) {
      if (lineItems[k]) {
        // line item has been selected
        if (k === 'BVI_shareholderDirectorDocFee') {
          this.subtotal += this.pricing[k]['price'] * this.qty;
        } else {
          this.subtotal += this.pricing[k]['price'];
        }
        selected.push(this.pricing[k].skuId);
      }
    }

    this.selectedSkuIds = selected;
  }

  doCheckout() {
    const id = +this.route.parent.snapshot.params['orderId'];

    this.orderService.createServiceItemOrder(id, this.selectedSkuIds)
      .flatMap((data) => {
        const step = this.stepService.step(3);
        return this.orderService
          .updateOrderApplicationStatus(id, step.id);
      })
      .subscribe((data) => {
        this.stepService.nagivateToStep(3);
      }, () => {
        console.error('Create entity services failed');
      });
  }

}
