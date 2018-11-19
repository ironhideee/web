import { Component, OnInit } from '@angular/core';
import {Entity} from '../entity';
import {Order} from '../order';
import {Invoice} from '../invoice';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderService} from '../order.service';
import {ActivatedRoute} from '@angular/router';
import {IncorpStepperService} from '../incorp-stepper.service';

@Component({
  selector: 'app-legal-cart',
  templateUrl: './legal-cart.component.html',
  styleUrls: ['./legal-cart.component.sass']
})
export class LegalCartComponent implements OnInit {

  form: FormGroup;

  order: Order;

  entity: Entity;

  invoice: Invoice;

  ifSuccess: boolean;

  isPaid: boolean;

  subtotal = 0;
  // recurrencePaymentSubtotal = 0;

  selectedSkuIds: number[];

  pricing = {
    legal_opinion: {
      skuId: 1701,
      price: 50000,
      recurrence: false
    },
    legal_opinion_emergency: {
      skuId: 1702,
      price: 15000,
      recurrence: false
    },
    legal_opinion_purchase_agreement: {
      skuId: 1703,
      price: 20000,
      recurrence: false
    },
    legal_opinion_sg_terms: {
      skuId: 1704,
      price: 20000,
      recurrence: false
    },
    legal_opinion_operating_agreement: {
      skuId: 1705,
      price: 20000,
      recurrence: false
    },
    legal_opinion_constitution: {
      skuId: 1706,
      price: 10000,
      recurrence: false
    },
    legal_opinion_IP_transfer: {
      skuId: 1707,
      price: 20000,
      recurrence: false
    },
    legal_opinion_lawyer_consult: {
      skuId: 1708,
      price: 25000,
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
      legal_opinion: [false],
      legal_opinion_emergency: [false],
      legal_opinion_purchase_agreement: [false],
      legal_opinion_sg_terms: [false],
      legal_opinion_operating_agreement: [false],
      legal_opinion_constitution: [false],
      legal_opinion_IP_transfer: [false],
      legal_opinion_lawyer_consult: [false]
    });

    // only check once during initialization
    this.orderService.getOrder(id)
      .subscribe((order) => {
        this.order = order;
        console.log(this.order.applicationStatus);
        if (this.order.applicationStatus === 'legal_success') {
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
                if (paidIds.includes(this.pricing[k]['skuId'])){
                  this.form.get(k).setValue(true);
                }
              }
            }
            // if (!paidIds.includes(1003)) {
            //   this.orderService.getEntity(order.entity_id)
            //     .subscribe((entity) => {
            //       if (entity.localDirector) {
            //         paidIds.push(1003);
            //       }
            //       const formItems = this.form.value;
            //       for (const k in formItems) {
            //         if (!formItems[k]) {
            //           if (paidIds.includes(this.pricing[k]['skuId'])){
            //             this.form.get(k).setValue(true);
            //           }
            //         }
            //       }
            //     }, (error) => {
            //       console.error('Error fetching entity');
            //     });
            // } else {
            //   const formItems = this.form.value;
            //   for (const k in formItems) {
            //     if (!formItems[k]) {
            //       if (paidIds.includes(this.pricing[k]['skuId'])){
            //         this.form.get(k).setValue(true);
            //       }
            //     }
            //   }
            // }
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
        // if (this.pricing[k]['recurrence']) {
        //   this.recurrencePaymentSubtotal += this.pricing[k]['price'];
        // }

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
