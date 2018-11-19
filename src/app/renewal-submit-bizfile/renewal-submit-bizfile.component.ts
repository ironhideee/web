import {Component, EventEmitter, OnInit} from '@angular/core';
import {UploadInput, UploadOutput} from 'ngx-uploader';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order.service';
import {IncorpStepperService} from '../incorp-stepper.service';
import {Order} from '../order';
import {IncorpGeneratedDocument} from '../incorp-generated-document';

@Component({
  selector: 'app-renewal-submit-bizfile',
  templateUrl: './renewal-submit-bizfile.component.html',
  styleUrls: ['./renewal-submit-bizfile.component.sass']
})
export class RenewalSubmitBizfileComponent implements OnInit {

  uploadInput: EventEmitter<UploadInput>;

  entityId: number;

  errors: string;

  order: Order;

  nextstep = false;

  bizfile_url: string;
  bizfileuploading = false;
  bizfilechecked = false;

  if_satori: boolean;

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.entityId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.updateBizFilePath();
    this.orderService.getOrder(this.entityId)
      .subscribe((order) => {
        this.order = order;
        if (this.order.applicationStatus === 'annual_sign_dir_reso' || 'annual_success') {
          this.nextstep = true;
        }
        for (const s of this.order.attachments) {
          if (s.fileType === 'annual_renewal_bizfile') {
            this.bizfilechecked = true;
          }
        }
        this.if_satori = order.is_satori;
      }, (error) => {
        console.error('Error getting order');
      });
  }

  updateBizFilePath() {
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'clg_bizfile')
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.bizfile_url = letter.url;
      }, (error) => {
        console.error('Update bizfile url failed: ', error);
      });
  }

  onBizfileUploadOutput(output: UploadOutput): void {
    this.bizfileuploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'annual_renewal_bizfile' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.bizfileuploading = false;
        this.bizfilechecked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  gotoNextStep() {
    this.stepService.nagivateToStep(5);
  }
}
