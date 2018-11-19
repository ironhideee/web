import { Component, OnInit } from '@angular/core';
import {Order} from '../order';
import {OrderService} from '../order.service';
import {ActivatedRoute} from '@angular/router';
import {IncorpStepperService} from '../incorp-stepper.service';

@Component({
  selector: 'app-renewal-introduction',
  templateUrl: './renewal-introduction.component.html',
  styleUrls: ['./renewal-introduction.component.sass']
})
export class RenewalIntroductionComponent implements OnInit {

  orderId: number;

  order: Order;

  ifCurrentStep: boolean;
  constructor(private stepService: IncorpStepperService,
              private route: ActivatedRoute,
              private orderService: OrderService,
  ) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.orderService.getOrder(this.orderId)
      .subscribe((order) => {
        this.order = order;
        if (this.order.applicationStatus === 'annual_intro') {
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
