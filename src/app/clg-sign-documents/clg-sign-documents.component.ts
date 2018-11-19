import { EventEmitter, Component, OnInit } from '@angular/core';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import { environment } from '../../environments/environment';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { IncorpStepperService } from '../incorp-stepper.service';
import { IncorpGeneratedDocument } from '../incorp-generated-document';
import {Order} from '../order';

@Component({
  selector: 'app-clg-sign-documents',
  templateUrl: './clg-sign-documents.component.html',
  styleUrls: ['./clg-sign-documents.component.sass']
})
export class ClgSignDocumentsComponent implements OnInit {

  regformUploaded = false;

  engageletterUploaded = false;

  regformuploading = false;

  engageletteruploading = false;

  regformchecked = false;

  ifSuccess: boolean;

  // disabled = true;

  engageLetterchecked = false;

  uploadInput: EventEmitter<UploadInput>;

  entityId: number;

  errors: string;

  order: Order;

  CLG_form_url: string;
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
    this.updateCLGFormPath();
    this.updateEngagementLetterPath();
    this.orderService.getOrder(this.entityId)
      .subscribe((order) => {
        this.order = order;
        // console.log(this.order.applicationStatus);
        if (this.order.applicationStatus === 'incorp_success') {
          this.ifSuccess = true;
        } else {
          this.ifSuccess = false;
        }
        for (const s of this.order.attachments) {
          if (s.fileType === 'signed_clg_registration_form') {
            this.regformchecked = true;
          }
          if (s.fileType === 'signed_clg_engagement_letter') {
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

  onRegFormUploadOutput(output: UploadOutput): void {
    this.regformuploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_clg_registration_form' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.regformUploaded = true;
        this.regformuploading = false;
        this.regformchecked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
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
        data: { type: 'signed_clg_engagement_letter' }
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

  updateCLGFormPath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'clg_registration_form')
      .subscribe((CLG_form: IncorpGeneratedDocument) => {
        this.CLG_form_url = CLG_form.url;
      }, (error) => {
        console.error('Update CLG form url failed: ', error);
      });
  }

  updateEngagementLetterPath(){
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'clg_engagement_letter')
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
