import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IncorpService} from '../incorp.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NaturalPerson } from '../natural-person';

@Component({
  selector: 'app-add-pte-member-dialog',
  templateUrl: './add-pte-member-dialog.component.html',
  styleUrls: ['./add-pte-member-dialog.component.sass']
})
export class AddPteMemberDialogComponent implements OnInit {

  directorForm: FormGroup;

  politicallyDangerous = false;

  orderId: number;

  nameInvalid: boolean;
  nameError: string;

  addressInvalid: boolean;
  addressError: string;

  isDirector = false;
  isShareHolder = false;
  showPercentage = false;

  constructor(
    private dialogRef: MatDialogRef<AddPteMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private incorpService: IncorpService) {
    this.orderId = data['orderId'];
  }

  ngOnInit() {
    this.directorForm = this.fb.group({
      name: ['', Validators.required],
      percentage: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      passportId: ['', Validators.required],
      address: ['', Validators.required],
      guaranteeAmount: [1, Validators.required],
      birthday: ['01-JAN-1990', Validators.required],
      nationality: ['Chinese', Validators.required],
      isPoliticallyDangerous: [false],
    });

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

  notPoliticallyDangerous() {
    if (this.politicallyDangerous === false) {
      this.politicallyDangerous = true;
    } else if (this.politicallyDangerous === true) {
      this.politicallyDangerous = false;
    }
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

  onSubmit() {
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
      .addNaturalPerson(this.orderId, director)
      .subscribe((np: NaturalPerson) => {
        console.log(np);
        // Closes the dialog and inform the parent component
        // that a new director has been added.
        this.dialogRef.close(np);
      }, (error) => {
        // console.error('Add director failed: ', error.error);
        console.log(error.error.msg);
        this.nameInvalid = error.error.msg.includes('Natural person');
        if (this.nameInvalid) {
          this.nameError = '您输入的姓名有误，请使用大写拼音';
        }

        this.addressInvalid = error.error.msg.includes('Address');
        if (this.addressInvalid) {
          this.addressError = '您输入的地址有误，地址只包含大小写字母、数字、 "."、"#" 和 "-"';
        }
      });
  }

  get email() {
    return this.directorForm.get('email');
  }

}
