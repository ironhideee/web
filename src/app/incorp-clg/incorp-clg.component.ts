import { Component, OnInit } from '@angular/core';
import { IncorpStepperService } from '../incorp-stepper.service';
import { IncorpStep } from '../incorp-step';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-incorp-clg',
  templateUrl: './incorp-clg.component.html',
  styleUrls: ['./incorp-clg.component.sass'],
})
export class IncorpClgComponent implements OnInit {

  // stepperService is injected from the parent component of this one.
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private stepperService: IncorpStepperService) { }

  ngOnInit() {
    const orderId = +this.route.snapshot.params['orderId'];

    // Get the order
    this.orderService.getOrder(orderId)
      .subscribe((o) => {
        this.stepperService
          .loadSteps(o.orderType, orderId, true)
          .subscribe(() => this.stepperService.enablesToId(o.applicationStatus))   
      });
  }

}
