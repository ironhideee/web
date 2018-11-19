import {Component, EventEmitter, OnInit} from '@angular/core';
import {UploadInput, UploadOutput} from 'ngx-uploader';
import {OrderService} from '../order.service';
import {IncorpGeneratedDocument} from '../incorp-generated-document';
import {AuthService} from '../auth.service';
import {environment} from '../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../order';
import {IncorpStepperService} from '../incorp-stepper.service';

@Component({
  selector: 'app-renewal-dir-reso',
  templateUrl: './renewal-dir-reso.component.html',
  styleUrls: ['./renewal-dir-reso.component.sass']
})
export class RenewalDirResoComponent implements OnInit {

  uploadInput: EventEmitter<UploadInput>;

  entityId: number;

  errors: string;

  order: Order;

  nextstep = false;

  directors_resolution_url: string;

  resolutionuploading = false;

  resolutionchecked = false;

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.entityId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.updateResolutionPath();
    this.orderService.getOrder(this.entityId)
      .subscribe((order) => {
        this.order = order;
        if (this.order.applicationStatus === 'annual_success') {
          this.nextstep = true;
        }
        for (const s of this.order.attachments) {
          if (s.fileType === 'signed_directors_resolution') {
            this.resolutionchecked = true;
          }
        }
      }, (error) => {
        console.error('Error fetching order');
      });
  }

  updateResolutionPath() {
    // 获得董事决议文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, 'directors_resolution')
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.directors_resolution_url = letter.url;
      }, (error) => {
        console.error('Update directors_resolution_url failed: ', error);
      });
  }

  onResolutionUploadOutput(output: UploadOutput): void {
    this.resolutionuploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_directors_resolution' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.resolutionuploading = false;
        this.resolutionchecked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  gotoNextStep() {
    this.stepService.nagivateToStep(6);
  }

}
