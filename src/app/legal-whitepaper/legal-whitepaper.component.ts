import {Component, EventEmitter, OnInit} from '@angular/core';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import {AuthService} from '../auth.service';
import {OrderService} from '../order.service';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../environments/environment';
import {IncorpStepperService} from '../incorp-stepper.service';
import {Order} from '../order';

@Component({
  selector: 'app-legal-whitepaper',
  templateUrl: './legal-whitepaper.component.html',
  styleUrls: ['./legal-whitepaper.component.sass']
})
export class LegalWhitepaperComponent implements OnInit {

  // cnwhitepaperUploaded = false;

  // enwhitepaperUploaded = false;

  cnwhitepaperuploading = false;

  enwhitepaperuploading = false;

  cnwhitepaperchecked = false;

  enwhitepaperchecked = false;

  uploadInput: EventEmitter<UploadInput>;

  entityId: number;

  errors: string;

  nextstep = false;

  order: Order;

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.entityId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.orderService.getOrder(this.entityId)
      .subscribe((order) => {
        this.order = order;
        // console.log(this.order.applicationStatus);
        if (this.order.applicationStatus === 'legal_kyc') {
          this.nextstep = true;
        }
        for (const s of this.order.attachments) {
          if (s.fileType === 'white_paper_original_english') {
            this.enwhitepaperchecked = true;
          }
          if (s.fileType === 'white_paper_original_chinese') {
            this.cnwhitepaperchecked = true;
          }
        }
      }, (error) => {
        console.error('Error fetching order');
      });
  }

  onCnWhitePaperUploadOutput(output: UploadOutput): void {
    this.cnwhitepaperuploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'white_paper_original_chinese' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        // this.regformUploaded = true;
        this.cnwhitepaperuploading = false;
        this.cnwhitepaperchecked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  onEnWhitePaperUploadOutput(output: UploadOutput): void {
    this.enwhitepaperuploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'white_paper_original_english' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        // this.enwhitepaperUploaded = true;
        this.enwhitepaperuploading = false;
        this.enwhitepaperchecked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
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
