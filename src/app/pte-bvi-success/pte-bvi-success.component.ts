import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IncorpStepperService} from '../incorp-stepper.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-pte-bvi-success',
  templateUrl: './pte-bvi-success.component.html',
  styleUrls: ['./pte-bvi-success.component.sass']
})
export class PteBviSuccessComponent implements OnInit {

  orderId: number;

  bvi_kit_address: string;

  bvi_kit_contact: string;

  constructor(
    private router: Router,
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.orderService.getOrder(this.orderId)
      .subscribe((o) => {
        this.orderService.getEntity(o.entity_id)
          .subscribe((e) => {
            this.bvi_kit_address = e.bviKitReceiverAddress;
            this.bvi_kit_contact = e.bviKitReceiverContact;
          });
      });
  }

}
