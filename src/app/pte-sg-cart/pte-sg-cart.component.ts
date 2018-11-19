import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Order} from '../order';
import {Entity} from '../entity';
import {Invoice} from '../invoice';
import {IncorpStepperService} from '../incorp-stepper.service';

@Component({
  selector: 'app-pte-sg-cart',
  templateUrl: './pte-sg-cart.component.html',
  styleUrls: ['./pte-sg-cart.component.sass']
})
export class PteSgCartComponent implements OnInit {

  form: FormGroup;

  order: Order;

  entity: Entity;

  invoice: Invoice;

  ifSuccess: boolean;

  isPaid: boolean;

  subtotal = 0;
  recurrencePaymentSubtotal = 0;

  selectedSkuIds: number[];

  pricing = {
    PLC_incorporationFee: {
      skuId: 1101,
      price: 3000,
      recurrence: false
    },
    PLC_localSecretaryFee: {
      skuId: 1102,
      price: 1200,
      recurrence: true
    },
    PLC_localDirectorFee: {
      skuId: 1103,
      price: 5000,
      recurrence: true
    },
    PLC_bankAccountStartFee: {
      skuId: 11041,
      price: 1000,
      recurrence: false
    },
    PLC_certificateFee: {
      skuId: 1105,
      price: 300,
      recurrence: false
    }
  };


  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder) { }

  ngOnInit() {
    const id = +this.route.snapshot.parent.params['orderId'];
    this.form = this.fb.group({
      PLC_incorporationFee: [true],
      PLC_localSecretaryFee: [true],
      PLC_localDirectorFee: [false],
      PLC_bankAccountStartFee: [false],
      PLC_certificateFee: [false],
    });

    // only check once during initialization
    this.orderService.getOrder(id)
      .subscribe((order) => {
        this.order = order;
        console.log(this.order.applicationStatus);
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
            if (!paidIds.includes(1103)) {
              this.orderService.getEntity(order.entity_id)
                .subscribe((entity) => {
                  if (entity.localDirector) {
                    paidIds.push(1103);
                  }
                  const formItems = this.form.value;
                  for (const k in formItems) {
                    if (!formItems[k]) {
                      if (paidIds.includes(this.pricing[k]['skuId'])){
                        this.form.get(k).setValue(true);
                      }
                    }
                  }
                }, (error) => {
                  console.error('Error fetching entity');
                });
            } else {
              const formItems = this.form.value;
              for (const k in formItems) {
                if (!formItems[k]){
                  if (paidIds.includes(this.pricing[k]['skuId'])) {
                    this.form.get(k).setValue(true);
                  }
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
    this.recurrencePaymentSubtotal = 0;

    const selected = [];

    // recaculate the subtotal
    const lineItems = this.form.value;
    for (const k in lineItems) {
      if (lineItems[k]) {
        // line item has been selected
        this.subtotal += this.pricing[k]['price'];
        if (this.pricing[k]['recurrence']) {
          this.recurrencePaymentSubtotal += this.pricing[k]['price'];
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
