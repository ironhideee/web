import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {MatDialog, MatSelectChange} from '@angular/material';
import { NaturalPerson } from '../natural-person';
import { UploadOutput, UploadInput } from 'ngx-uploader';
import { AuthService } from '../auth.service';
import {ActivatedRoute} from '@angular/router';
import { Deserialize } from 'cerialize';
import {IncorpService} from '../incorp.service';

export interface ProofOfAddressType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-pte-members-forms',
  templateUrl: './pte-members-forms.component.html',
  styleUrls: ['./pte-members-forms.component.sass']
})

export class PteMembersFormsComponent implements OnInit {

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

  uploading = false;

  orderId: number;

  directors: NaturalPerson[] = [];

  showTable = false;

  directorForm: FormGroup;

  personId: number;

  addressInvalid: boolean;
  addressError: string;

  isDirector: boolean;
  isShareHolder: boolean;
  showPercentage: boolean;

  percentageNum: any;

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
    if (this.director.percentage === null) {
      this.percentageNum = '';
    } else {
      this.percentageNum = this.director.percentage.toString();
    }
    this.directorForm = this.fb.group({
      name: [this.director.name, Validators.required],
      percentage: [this.percentageNum],
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
    this.isDirector = this.director.isDirector;
    this.isShareHolder = this.director.isShareHolder;
    if (this.director.isShareHolder === true) {
      this.showPercentage = true;
    } else {
      this.showPercentage = false;
    }
  }

  isMissingInfo() {
    const result = false;
    const formItems = this.directorForm.value;
    for (const k in formItems) {
      if (formItems[k] === '' && k !== 'percentage') {
        return true;
      }
    }
    return result;
  }

  ifDirector() {
    if (this.isDirector === false) {
      this.isDirector = true;
    } else if (this.isDirector === true) {
      this.isDirector = false;
    }
  }

  ifShareHolder() {
    if (this.isShareHolder === false) {
      this.isShareHolder = true;
      this.showPercentage = true;
    } else if (this.isShareHolder === true) {
      this.isShareHolder = false;
      this.showPercentage = false;
    }
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
      this.isDirector,
      true,
      this.isShareHolder,
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
