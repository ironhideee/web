import {Component, EventEmitter, OnInit} from '@angular/core';
import {UploadInput, UploadOutput} from 'ngx-uploader';
import {IncorpGeneratedDocument} from '../incorp-generated-document';
import {environment} from '../../environments/environment';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {ActivatedRoute} from '@angular/router';
import {IncorpStepperService} from '../incorp-stepper.service';
import {Order} from '../order';

@Component({
  selector: 'app-renewal-sign',
  templateUrl: './renewal-sign.component.html',
  styleUrls: ['./renewal-sign.component.sass']
})
export class RenewalSignComponent implements OnInit {

  uploadInput: EventEmitter<UploadInput>;

  entityId: number;

  errors: string;

  order: Order;

  Ar_contract_url: string;

  ifSuccess: boolean;

  arcontractuploading = false;

  arcontractchecked = false;

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.entityId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.updateArContractPath();
    this.orderService.getOrder(this.entityId)
      .subscribe((order) => {
        this.order = order;
        if (this.order.applicationStatus === 'annual_success') {
          this.ifSuccess = true;
        } else {
          this.ifSuccess = false;
        }
        for (const s of this.order.attachments) {
          if (s.fileType === 'signed_annual_renewal_contract') {
            this.arcontractchecked = true;
          }
        }
      }, (error) => {
        console.error('Error fetching order');
      });
  }

  updateArContractPath() {
    // 获得年度续费合同文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'annual_renewal_contract')
      .subscribe((Ar_contract: IncorpGeneratedDocument) => {
        this.Ar_contract_url = Ar_contract.url;
      }, (error) => {
        console.error('Update Ar_contract url failed: ', error);
      });
  }

  onArContractUploadOutput(output: UploadOutput): void {
    this.arcontractuploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_annual_renewal_contract' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.arcontractuploading = false;
        this.arcontractchecked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  getIfSuccess() {
    return this.ifSuccess;
  }

  gotoNextStep() {
    // 进入下一步
    const step = this.stepService.step(4);
    this.orderService
      .updateOrderApplicationStatus(this.entityId, step.id)
      .subscribe(() => {
        this.stepService.nagivateToStep(4);
      });
  }
}
