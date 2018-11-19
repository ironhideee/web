import {Component, EventEmitter, OnInit} from '@angular/core';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import {AuthService} from '../auth.service';
import {OrderService} from '../order.service';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../environments/environment';
import {IncorpStepperService} from '../incorp-stepper.service';
import {Order} from '../order';
import { Entity } from '../entity';
import {NaturalPerson} from '../natural-person';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {IncorpGeneratedDocument} from '../incorp-generated-document';
import {AddDirectorDialogComponent} from '../add-director-dialog/add-director-dialog.component';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddBviMenberDialogComponent} from '../add-bvi-menber-dialog/add-bvi-menber-dialog.component';
import {AddPteMemberDialogComponent} from '../add-pte-member-dialog/add-pte-member-dialog.component';

@Component({
  selector: 'app-legal-kyc',
  templateUrl: './legal-kyc.component.html',
  styleUrls: ['./legal-kyc.component.sass']
})
export class LegalKycComponent implements OnInit {

  uploadInput: EventEmitter<UploadInput>;

  directors: NaturalPerson[] = [];

  basicInfoForm: FormGroup;

  entityId: number;

  bizfile_url: string;

  loading = true;

  constitution_url: string;

  errors: string;

  nextstep = false;

  sd1uploading = false;
  sd1checked = false;

  sd2uploading = false;
  sd2checked = false;

  sd3uploading = false;
  sd3checked = false;

  bizfileuploading = false;
  bizfilechecked = false;

  constitutionuploading = false;
  constitutionchecked = false;

  KYC_choice: boolean;

  type_clg: boolean;
  type_sg: boolean;
  type_bvi: boolean;

  bizfile_type: string;
  constitution_type: string;

  order: Order;

  constructor(
    private stepService: IncorpStepperService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private orderService: OrderService) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.entityId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.orderService.getOrder(this.entityId)
      .subscribe((order) => {
        // console.log(order);
        this.order = order;
        if (order.entity_type === 'clg') {
          this.type_clg = true;
          this.bizfile_type = 'clg_bizfile';
          this.constitution_type = 'clg_constitution';
        } else if (order.entity_type === 'plc_singapore') {
          this.type_sg = true;
          this.bizfile_type = 'plc_bizfile';
          this.constitution_type = 'plc_constitution';
        } else if (order.entity_type === 'plc_bvi') {
          this.type_bvi = true;
          this.bizfile_type = 'plc_bizfile';
          this.constitution_type = 'plc_constitution';
        }
        this.updateBizFilePath();
        this.updateConstitutionPath();
        if (this.order.applicationStatus === 'legal_success') {
          this.nextstep = true;
        }
        for (const s of this.order.attachments) {
          if (s.fileType === 'legal_bizfile') {
            this.bizfilechecked = true;
          }
          if (s.fileType === 'legal_constitution') {
            this.constitutionchecked = true;
          }
          if (s.fileType === 'signed_legal_sd1') {
            this.sd1checked = true;
          }
          if (s.fileType === 'signed_legal_sd2') {
            this.sd2checked = true;
          }
          if (s.fileType === 'signed_legal_sd3') {
            this.sd3checked = true;
          }
        }
        this.KYC_choice = order.is_satori;
        this.orderService.getEntity(order.entity_id)
          .subscribe((e) => {
            this.basicInfoForm = this.fb.group({
              directors: this.fb.array(e.naturalPeople.map(this.createNaturalPersonForm.bind(this)))
            });

            this.directors = e.naturalPeople;

            this.loading = false;
          }, (err) => {
            this.loading = false;
            this.errors = err.message;
          });
      }, (error) => {
        console.error('Error getting order');
      });
  }

  isPaid() {
    return false;
  }

  openAddDirectorDialog() {
    let componentType;
    if (this.type_clg) {
      componentType = AddDirectorDialogComponent;
    } else if (this.type_sg) {
      componentType = AddPteMemberDialogComponent;
    } else if (this.type_bvi) {
      componentType = AddBviMenberDialogComponent;
    }
    const dialogRef = this.dialog.open(componentType, {
      width: '550px',
      height: '95%',
      data: {
        orderId: this.entityId
      }
    });

    dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.appendDirector(d);
      }
      console.log('The dialog was closed');
    });
  }

  appendDirector(director: NaturalPerson) {
    this.directors.push(director);
    const directorFA = this.basicInfoForm.get('directors') as FormArray;
    directorFA.push(this.createNaturalPersonForm(director));
  }

  createNaturalPersonForm(o: NaturalPerson) {
    return this.fb.group({
      passportFile: [''],
      idFrontFile: [''],
      idBackFile: [''],
    });
  }

  removeNaturalPerson(np: NaturalPerson) {
    return this.orderService
      .removeNaturalPerson(np)
      .subscribe(() => {
        const idx = this.directors.findIndex(_np => _np.id === np.id);

        // Remove view item
        this.directors.splice(idx, 1);

        // Remove form item
        const directorFA = this.basicInfoForm.get('directors') as FormArray;
        directorFA.removeAt(idx);
      }, () => {
        console.error('Remove natural person failed, try again.');
      });
  }

  updateBizFilePath() {
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, this.bizfile_type)
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.bizfile_url = letter.url;
      }, (error) => {
        console.error('Update bizfile url failed: ', error);
      });
  }

  updateConstitutionPath() {
    // 获得文档信息
    this.orderService
      .downloadIncorpPDF(this.entityId, this.constitution_type)
      .subscribe((letter: IncorpGeneratedDocument) => {
        this.constitution_url = letter.url;
      }, (error) => {
        console.error('Update constitution url failed: ', error);
      });
  }

  onSD1UploadOutput(output: UploadOutput): void {
    this.sd1uploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_legal_sd1' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.sd1uploading = false;
        this.sd1checked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  onSD2UploadOutput(output: UploadOutput): void {
    this.sd2uploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_legal_sd2' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.sd2uploading = false;
        this.sd2checked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  onSD3UploadOutput(output: UploadOutput): void {
    this.sd3uploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'signed_legal_sd3' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.sd3uploading = false;
        this.sd3checked = true;
      } else {
        // Failed
        // TODO: different error messages for different responses.
        console.error('Upload document failed.', responseBody);
        this.errors = '上传失败，请重试';
      }
    }
  }

  // 上传legal_bizfile
  onBizfileUploadOutput(output: UploadOutput): void {
    this.bizfileuploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'legal_bizfile' }
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


  // 上传legal_constitution
  onConstitutionUploadOutput(output: UploadOutput): void {
    this.constitutionuploading = true;
    if (output.type === 'allAddedToQueue') {
      this.errors = null;

      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/orders/${this.entityId}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { type: 'legal_constitution' }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'done') {
      const responseCode = output.file.responseStatus;
      const responseBody = output.file.response;

      if (responseCode === 200) {
        // Success
        this.constitutionuploading = false;
        this.constitutionchecked = true;
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
