import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {IncorpGeneratedDocument} from '../incorp-generated-document';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-renewal-success',
  templateUrl: './renewal-success.component.html',
  styleUrls: ['./renewal-success.component.sass']
})
export class RenewalSuccessComponent implements OnInit {

  orderId: number;
  annual_renewal_bizfile_url: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.updateNewBizfilePath();
  }

  updateNewBizfilePath() {
    // 获得新版bizfile文档信息
    this.orderService
      .downloadIncorpPDF(this.orderId, 'annual_renewal_updated_bizfile')
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.annual_renewal_bizfile_url = letter.url;
      }, (error) => {
        console.error('Update legal_opinion failed: ', error);
      });
  }

}
