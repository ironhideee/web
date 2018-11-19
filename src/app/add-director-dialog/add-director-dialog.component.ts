import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { Director } from '../director';
import { IncorpService } from '../incorp.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NaturalPerson } from '../natural-person';
import {isUpperCase} from 'tslint/lib/utils';

@Component({
  selector: 'app-add-director-dialog',
  templateUrl: './add-director-dialog.component.html',
  styleUrls: ['./add-director-dialog.component.sass'],
  providers: [
    IncorpService
  ]
})
export class AddDirectorDialogComponent implements OnInit {

  directorForm: FormGroup;

  politicallyDangerous = false;

  orderId: number;

  nameInvalid: boolean;
  nameError: string;

  addressInvalid: boolean;
  addressError: string;

  constructor(
    private dialogRef: MatDialogRef<AddDirectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private incorpService: IncorpService) {
    this.orderId = data['orderId'];
  }

  ngOnInit() {
    this.directorForm = this.fb.group({
      name: ['', Validators.required],
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
      if (formItems[k] === '') {
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
      true,
      true,
      false,
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
