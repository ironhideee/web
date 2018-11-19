import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { IncorpStepperService } from '../incorp-stepper.service';
import {Order} from '../order';


@Component({
  selector: 'app-incorp-status',
  templateUrl: './incorp-status.component.html',
  styleUrls: ['./incorp-status.component.sass']
})
export class IncorpStatusComponent implements OnInit {

  entityId: number;
  order: Order;
  nextstep = false;
  status: string;

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.entityId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.orderService
      .getOrder(this.entityId)
      .subscribe((order) => {
        this.order = order;
        if (this.order.applicationStatus === 'incorp_success') {
          this.nextstep = true;
          this.status = '您的申请已通过审核';
        } else {
          this.status = '您的申请正在审核中';
          // console.log(this.status);
        }
      });
  }

  gotoNextStep() {
    // 进入下一步
    // const step = this.stepService.step(6);
    // this.orderService
    //   .updateOrderApplicationStatus(this.entityId, step.id)
    //   .subscribe(() => {
    //     this.stepService.nagivateToStep(6);
    //   });
    this.stepService.nagivateToStep(6);
  }
}
