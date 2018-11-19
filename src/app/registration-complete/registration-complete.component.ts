import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {ActivatedRoute} from '@angular/router';
import {IncorpStepperService} from '../incorp-stepper.service';
import { Order } from '../order';
import { Router } from '@angular/router';
import {Entity} from '../entity';
import {IncorpGeneratedDocument} from '../incorp-generated-document';

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html',
  styleUrls: ['./registration-complete.component.sass']
})
export class RegistrationCompleteComponent implements OnInit {
  entityId: number;

  bizfile_url: string;

  constitution_url: string;

  certificate_url: string;

  constructor(
    private router: Router,
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.entityId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.updateBizFilePath();
    this.updateConstitutionPath();
    this.updateCertificatePath();
  }

  updateBizFilePath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'clg_bizfile')
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.bizfile_url = letter.url;
      }, (error) => {
        console.error('Update bizfile url failed: ', error);
      });
  }

  updateConstitutionPath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'clg_constitution')
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.constitution_url = letter.url;
      }, (error) => {
        console.error('Update constitution url failed: ', error);
      });
  }

  updateCertificatePath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'clg_certificate')
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.certificate_url = letter.url;
      }, (error) => {
        console.error('Update certificate url failed: ', error);
      });
  }
}
