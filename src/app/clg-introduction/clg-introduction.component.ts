import { Component, OnInit } from '@angular/core';
import {IncorpStepperService} from '../incorp-stepper.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order.service';
import {Order} from '../order';

@Component({
  selector: 'app-clg-introduction',
  templateUrl: './clg-introduction.component.html',
  styleUrls: ['./clg-introduction.component.sass']
})
export class ClgIntroductionComponent implements OnInit {

  orderId: number;

  order: Order;

  ifCurrentStep: boolean;

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.orderService.getOrder(this.orderId)
      .subscribe((order) => {
        this.order = order;
        if (this.order.applicationStatus === 'incorp_introduction') {
          this.ifCurrentStep = true;
        } else {
          this.ifCurrentStep = false;
        }
      }, (error) => {
        console.error('Error fetching order');
      });
  }

  ifStart() {
    return this.ifCurrentStep;
  }

  gotoNextStep() {
    // 进入下一步
    const id = +this.route.snapshot.parent.params['orderId'];
    const step = this.stepService.step(1);
    this.orderService
      .updateOrderApplicationStatus(id, step.id)
      .subscribe(() => {
        this.stepService.nagivateToStep(1);
      });
  }

}
