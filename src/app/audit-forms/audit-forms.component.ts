import {Component, EventEmitter, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';
import {IncorpStepperService} from '../incorp-stepper.service';
import {UploadInput, UploadOutput} from 'ngx-uploader';
import {environment} from '../../environments/environment';
import {IncorpGeneratedDocument} from '../incorp-generated-document';

@Component({
  selector: 'app-audit-forms',
  templateUrl: './audit-forms.component.html',
  styleUrls: ['./audit-forms.component.css']
})
export class AuditFormsComponent implements OnInit {

  documentUploaded = false;

  uploadInput: EventEmitter<UploadInput>;

  orderId: number;

  errors: string;

  auditContract_url: string;

  auditConstitution_url: string;

  auditorAppointedContract_url: string;

  selected_down_ids: number[] = [];

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService,
    private stepperService: IncorpStepperService
  ) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.updateAuditContractPath();
    this.updateAuditConstitutionPath();
    this.updateAuditorAppointedContractPath();
  }

  onAuditContractUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.orderId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_audit_contract' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.documentUploaded = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  onAuditConstitutionUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.orderId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_audit_constitution' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.documentUploaded = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  onAuditAppointedUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.orderId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_auditor_appointed_contract' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.documentUploaded = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  updateAuditContractPath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.orderId, 'audit_contract')
      .subscribe((CLG_form: IncorpGeneratedDocument) => {
        this.auditContract_url = CLG_form.url;
      }, (error) => {
        console.error('Update Audit Contract url failed: ', error);
      });
  }

  updateAuditConstitutionPath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.orderId, 'audit_constitution')
      .subscribe((CLG_form: IncorpGeneratedDocument) => {
        this.auditConstitution_url = CLG_form.url;
      }, (error) => {
        console.error('Update Aaudit Constitution url failed: ', error);
      });
  }

  updateAuditorAppointedContractPath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.orderId, 'auditor_appointed_contract')
      .subscribe((CLG_form: IncorpGeneratedDocument) => {
        this.auditorAppointedContract_url = CLG_form.url;
      }, (error) => {
        console.error('Update Auditor Appointed Contract url failed: ', error);
      });
  }

  gotoNextStep() {

    this.selected_down_ids.push(10061);
    this.selected_down_ids.push(10062);

    this.orderService.createServiceItemOrder(this.orderId, this.selected_down_ids)
    .flatMap((data) => {
      const step = this.stepService.step(1);
      return this.orderService
        .updateOrderApplicationStatus(this.orderId, step.id);
    })
    .subscribe((data) => {
      this.stepService.nagivateToStep(1);
    }, () => {
      console.error('Create entity services failed');
    });
    // // 进入下一步
    // const step = this.stepService.step(1);
    // console.log(step);
    // this.orderService
    //   .updateOrderApplicationStatus(this.entityId, step.id)
    //   .subscribe(() => {
    //     this.stepService.nagivateToStep(1);
    //   });
  }

}
