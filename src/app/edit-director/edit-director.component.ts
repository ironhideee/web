import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { NaturalPerson } from '../natural-person';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncorpService} from '../incorp.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-director',
  templateUrl: './edit-director.component.html',
  styleUrls: ['./edit-director.component.sass'],
  providers: [
    IncorpService
  ]
})
export class EditDirectorComponent implements OnInit {

  @Input() director: NaturalPerson;

  @Output() ifshow = new EventEmitter<boolean>();

  directorForm: FormGroup;

  orderId: number;

  personId: number;

  addressInvalid: boolean;
  addressError: string;

  showTable: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private incorpService: IncorpService
  ) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    // console.log(this.director);
    this.personId = this.director.id;
    this.directorForm = this.fb.group({
      name: [this.director.name, Validators.required],
      email: [this.director.email, [Validators.required, Validators.email]],
      phone: [this.director.phone, Validators.required],
      passportId: [this.director.passportNumber, Validators.required],
      address: [this.director.address, Validators.required],
      guaranteeAmount: [this.director.guaranteeAmount, Validators.required],
      birthday: [this.director.birthday, Validators.required],
      nationality: [this.director.nationality, Validators.required],
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
        this.ifshow.emit(this.showTable);
      }, (error) => {
        console.log(error.error.msg);
      });
  }

  get email() {
    return this.directorForm.get('email');
  }
}
