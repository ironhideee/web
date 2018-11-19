import {Component, EventEmitter, OnInit} from '@angular/core';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import { ActivatedRoute } from '@angular/router';
import {OrderService} from '../order.service';
import {IncorpGeneratedDocument} from '../incorp-generated-document';
import {AuthService} from '../auth.service';
import {environment} from '../../environments/environment';
import {Order} from '../order';
import {IncorpStepperService} from '../incorp-stepper.service';

@Component({
  selector: 'app-pte-bvi-sign',
  templateUrl: './pte-bvi-sign.component.html',
  styleUrls: ['./pte-bvi-sign.component.sass']
})
export class PteBviSignComponent implements OnInit {

  engageletterUploaded = false;

  engageletteruploading = false;

  ifSuccess: boolean;

  engageLetterchecked = false;

  uploadInput: EventEmitter<UploadInput>;

  entityId: number;

  errors: string;

  order: Order;

  engagement_letter_url: string;

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.entityId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.updateEngagementLetterPath();
    this.orderService.getOrder(this.entityId)
      .subscribe((order) => {
        this.order = order;
        if (this.order.applicationStatus === 'incorp_success') {
          this.ifSuccess = true;
        } else {
          this.ifSuccess = false;
        }
        for (const s of this.order.attachments) {
          if (s.fileType === 'signed_plc_engagement_letter') {
            this.engageLetterchecked = true;
          }
        }
      }, (error) => {
        console.error('Error fetching order');
      });
  }

  getIfSuccess() {
    return this.ifSuccess;
  }

  onEngageLetterUploadOutput(output: UploadOutput): void {
    this.engageletteruploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_plc_engagement_letter' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.engageletterUploaded = true;
        this.engageletteruploading = false;
        this.engageLetterchecked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  updateEngagementLetterPath() {
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'plc_engagement_letter')
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.engagement_letter_url = letter.url;
      }, (error) => {
        console.error('Update engagement letter url failed: ', error);
      });
  }

  gotoNextStep() {
    // 进入下一步
    const step = this.stepService.step(5);
    this.orderService
      .updateOrderApplicationStatus(this.entityId, step.id)
      .subscribe(() => {
        this.stepService.nagivateToStep(5);
      });
  }

}
