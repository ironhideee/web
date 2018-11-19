import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Entity} from '../entity';
import {AddDirectorDialogComponent} from '../add-director-dialog/add-director-dialog.component';
import {IncorpStepperService} from '../incorp-stepper.service';
import {HttpClient} from '@angular/common/http';
import { NaturalPerson } from '../natural-person';
import {MatChipInputEvent, MatDialog} from '@angular/material';
import {Order} from '../order';
import {AddPteMemberDialogComponent} from '../add-pte-member-dialog/add-pte-member-dialog.component';

@Component({
  selector: 'app-pte-sg-forms',
  templateUrl: './pte-sg-forms.component.html',
  styleUrls: ['./pte-sg-forms.component.sass']
})
export class PteSgFormsComponent implements OnInit {

  basicInfoForm: FormGroup;

  orderId: number;

  directors: NaturalPerson[] = [];

  loading = true;

  uploading = false;

  generating = false;

  order: Order;

  ifSuccess: boolean;

  is_paid: boolean;

  errors;

  entity_name: string;

  ifNameRepeat: boolean;

  // ifNameRepeatLocal: boolean;

  selectedBusinessActivities: string[];
  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private authService: AuthService,
    private stepService: IncorpStepperService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    protected http: HttpClient
  ) {
    this.orderId = +route.parent.snapshot.params['orderId'];
  }

  ngOnInit() {
    // Get order detail
    this.orderService.getOrder(this.orderId)
      .subscribe((o) => {
        const dateFmt = /\d{2}\/\d{2}/;
        this.orderService.getEntity(o.entity_id)
          .subscribe((e) => {
            this.selectedBusinessActivities = e.businessActivities;

            this.basicInfoForm = this.fb.group({
              name: [e.PteShortName, Validators.required],
              businessActivities: [null],
              financialYearEnd: [
                e.financialYearEnd,
                [Validators.required, Validators.pattern(dateFmt)]
              ],
              localDirector: [e.localDirector],
              numberOfShares: [e.numberOfShares],
              valuePerShare: [e.valuePerShare],
              directors: this.fb.array(e.naturalPeople.map(this.createNaturalPersonForm.bind(this)))
            });

            this.directors = e.naturalPeople;

            this.loading = false;
          }, (err) => {
            this.loading = false;
            this.errors = err.message;
          });
      });

    this.orderService.getOrder(this.orderId)
      .subscribe((order) => {
        this.order = order;
        if (this.order.applicationStatus === 'incorp_success') {
          this.ifSuccess = true;
        } else {
          this.ifSuccess = false;
        }
        if (this.order.paymentStatus.toLowerCase() === 'success') {
          this.is_paid = true;
        } else { // no matter incomplete, pending, or fail, all are considered as not paid
          this.is_paid = false;
        }
      }, (error) => {
        console.error('Error fetching order');
      });
  }

  isPaid() {
    return this.is_paid;
  }

  getIfSuccess() {
    return this.ifSuccess;
  }

  isDirectorSet() {
    return this.directors.length > 0;
  }

  onSubmit() {
    this.generating = true;
    const rawOrder = this.basicInfoForm.value;
    const entity = new Entity();
    entity.id = this.order.entity_id;
    entity.isChineseName = false; // 目前前端不支持用户使用中文名字注册
    entity.entityType = 'plc_singapore';

    [
      'name',
      'financialYearEnd',
      'localDirector',
      'numberOfShares',
      'valuePerShare',
    ].forEach((key) => {
      entity[key] = rawOrder[key];
    });
    console.log(entity);

    entity.name += ' Pte. LTD.';
    entity.businessActivities = this.selectedBusinessActivities;

    this.orderService
      .updateEntity(entity)
      .flatMap((data) => {
        const step = this.stepService.step(2);
        return this.orderService
          .updateOrderApplicationStatus(this.order.id, step.id);
      })
      .subscribe(
        data => {
          this.generating = false;
          this.stepService.nagivateToStep(2);
        },
        error => {
          this.basicInfoForm.setErrors({ error });
          console.log(error.error.msg);
          // if (error.error.msg === 'The name is already existed, please change into another name.') {
          //   this.ifNameRepeatLocal = true;
          // }
        }
      );
  }

  // 从第三方网站及本地数据库查询基金会名字是否重复
  onCheckName(entityName: string) {
    this.entity_name = entityName + ' PTE. LTD.'
    this.orderService.checkEntityName(this.entity_name  , this.orderId)
      .subscribe((data) => {
          this.ifNameRepeat = false;
        },
        error => {
          console.log(error.error.msg);
          if (error.error.msg === 'Duplicate entitiy name is found.') {
            this.ifNameRepeat = true;
          } else {
            this.ifNameRepeat = false;
          }
        });
  }

  serializeForm(form: FormGroup): Entity {
    const entity = new Entity();

    entity.name = form.get('name').value;
    entity.businessActivities = form.get('businessActivities').value;
    entity.financialYearEnd = form.get('financialYearEnd').value;
    entity.localDirector = form.get('localDirector').value;
    entity.isChineseName = form.get('isChineseName').value;

    return entity;
  }

  openAddDirectorDialog() {
    const dialogRef = this.dialog.open(AddPteMemberDialogComponent, {
      width: '550px',
      height: '95%',
      data: {
        orderId: this.orderId
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

  removeBusinessActivity(ba: string) {
    this.selectedBusinessActivities = this.selectedBusinessActivities.filter(_ba => _ba !== ba);
  }

  addBusinessActivity(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add the new business
    if ((value || '').trim()) {
      this.selectedBusinessActivities.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  get financialYearEnd() {
    return this.basicInfoForm.get('financialYearEnd');
  }

  get businessActivities() {
    return this.basicInfoForm.get('businessActivities');
  }

  updateDirector(newDirector: NaturalPerson) {
    const idx = this.directors.findIndex((np) => np.id === newDirector.id);
    this.directors[idx] = newDirector;
  }

}
