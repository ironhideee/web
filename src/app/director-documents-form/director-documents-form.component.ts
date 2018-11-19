import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NaturalPerson } from '../natural-person';
import { OrderService } from '../order.service';
import { UploadOutput, UploadInput } from 'ngx-uploader';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { Deserialize } from 'cerialize';
import {MatDialog, MatSelectChange} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddDirectorDialogComponent} from '../add-director-dialog/add-director-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {IncorpService} from '../incorp.service';

export interface ProofOfAddressType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-director-documents-form',
  templateUrl: './director-documents-form.component.html',
  styleUrls: ['./director-documents-form.component.sass']
})
export class DirectorDocumentsFormComponent implements OnInit {

  // Event channel for uploading files
  uploadInput = new EventEmitter<UploadInput>();

  @Output() remove = new EventEmitter<NaturalPerson>();

  @Input() director: NaturalPerson;

  @Input() isPaid: boolean;

  proofOfAddressTypes: ProofOfAddressType[] = [
    { value: 'id_card', viewValue: '身份证（中国董事）' },
    { value: 'driver_license', viewValue: '驾照（外国董事）' },
    { value: 'power_bill', viewValue: '水电账单' },
    { value: 'bank_bill', viewValue: '银行账单' },
  ];

  directorForm: FormGroup;

  uploading = false;

  personId: number;

  orderId: number;

  directors: NaturalPerson[] = [];

  showTable = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private incorpService: IncorpService,
    private orderService: OrderService) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.personId = this.director.id;
    this.directorForm = this.fb.group({
      name: [this.director.name, Validators.required],
      current_occupation: [this.director.current_occupation, Validators.required],
      current_employer_company: [this.director.current_employer_company, Validators.required],
      email: [this.director.email, [Validators.required, Validators.email]],
      phone: [this.director.phone, Validators.required],
      passportId: [this.director.passportNumber, Validators.required],
      address: [this.director.address, Validators.required],
      guaranteeAmount: [this.director.guaranteeAmount, Validators.required],
      birthday: [this.director.birthday, Validators.required],
      nationality: [this.director.nationality, Validators.required],
      isPoliticallyDangerous: [false],
      ifPLCShareHolder: this.director.isShareHolder,
      ifPLCDirector: this.director.isDirector,
    });
  }

  isMissingInfo() {
    const result = false;
    const formItems = this.directorForm.value;
    for (const k in formItems) {
      if (formItems[k] === '') {
        return true;
      }
    }
    return result;
  }

  onUpdate() {
    const formModel = this.directorForm.value;

    const director = new NaturalPerson(
      formModel.name,
      formModel.percentage,
      formModel.email,
      formModel.phone,
      '',
      formModel.passportId,
      formModel.address,
      formModel.guaranteeAmount,
      formModel.isPoliticallyDangerous,
      formModel.birthday,
      formModel.nationality,
      true,
      true,
      false,
      '',
      ''
    );
    director.name = director.name.toUpperCase();
    director.passportNumber = director.passportNumber.toUpperCase();
    this.incorpService
      .updateNaturalPerson(this.orderId, this.personId, director)
      .subscribe((np: NaturalPerson) => {
        console.log(np);
        this.director = np;
        this.showTable = false;
        // 向父组件传参数,决定是否隐藏编辑列表
        // this.ifshow.emit(this.showTable);
      }, (error) => {
        console.log(error.error.msg);
      });
  }

  get email() {
    return this.directorForm.get('email');
  }

  /*Update directors information*/
  openEditDirectorDialog() {
    this.orderService
      .getNaturalPerson(this.orderId, this.director.id)
      .subscribe((np) => {
        this.director = np;
        if (this.showTable === false) {
          this.showTable = true;
        } else if (this.showTable === true) {
          this.showTable = false;
        }
      });
  }

  // 获取子组件参数
  saveAndHide(data: boolean): void {
    this.showTable = data;
  }

  /**
   * Update the type of proof of address
   */
  onProofOfAddressTypeChanged(change: MatSelectChange) {
    this.orderService
      .updateAddressType(this.director, change.value)
      .subscribe((data) => {
        console.log('Updated proof of address method: %s', change.value);
      }, () => {
        console.error('Update failed');
      });
  }

  /**
   * @param output the status change event
   * @param fileType type of uploading file
   *  - image_passport
   *  - image_address_proof_front
   *  - image_address_proof_back
   */
  onUploadStatusChanged(output: UploadOutput, fileType: string): void {
    this.uploading = true;
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.apiBaseUrl}/natural-people/${this.director.id}/files`,
        headers: { 'Authorization': 'Bearer ' + this.authService.getToken() },
        method: 'POST',
        data: { file_type: fileType }
      };
      this.uploadInput.emit(event);
      this.uploading = false;
    } else if (output.type === 'done') {
      const newDirector = Deserialize(output.file.response.result, NaturalPerson);
      console.log(this.director);
      this.director.partiallyUpdate(fileType, newDirector);
      console.log(this.director);
      this.uploading = false;
    }
  }

  updateDirector(d: NaturalPerson): void {
    // Nothing..
  }

  removeDirector(): void {
    this.remove.emit(this.director);
  }

  get requireBackImage(): boolean {
    return [
      'id_card',
      'driver_license'
    ].includes(this.director.addressProofType);
  }
}
