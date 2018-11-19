import { Component, OnInit } from '@angular/core';
import {IncorpGeneratedDocument} from '../incorp-generated-document';
import { OrderService } from '../order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-audit-complete',
  templateUrl: './audit-complete.component.html',
  styleUrls: ['./audit-complete.component.sass']
})
export class AuditCompleteComponent implements OnInit {

  audit_bizfile_url: string;
  orderId: number;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.updateAuditBizfilePath();
  }

  updateAuditBizfilePath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.orderId, 'audit_bizfile')
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.audit_bizfile_url = letter.url;
      }, (error) => {
        console.error('Update audit bizfile url failed: ', error);
      });
  }

}
