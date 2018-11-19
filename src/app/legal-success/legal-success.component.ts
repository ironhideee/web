import { Component, OnInit } from '@angular/core';
import {IncorpGeneratedDocument} from '../incorp-generated-document';
import {AuthService} from '../auth.service';
import {OrderService} from '../order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IncorpStepperService} from '../incorp-stepper.service';

@Component({
  selector: 'app-legal-success',
  templateUrl: './legal-success.component.html',
  styleUrls: ['./legal-success.component.sass']
})
export class LegalSuccessComponent implements OnInit {

  entityId: number;
  legal_opinion_url: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) {
    this.entityId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.updateLegalOpinionPath();
  }

  updateLegalOpinionPath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'legal_opinion')
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.legal_opinion_url = letter.url;
      }, (error) => {
        console.error('Update legal_opinion failed: ', error);
      });
  }
}
