import {Component, EventEmitter, OnInit} from '@angular/core';
import {UploadInput, UploadOutput} from 'ngx-uploader';
import {OrderService} from '../order.service';
import {Order} from '../order';
import {Entity} from '../entity';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import {MatSelectChange} from '@angular/material';

export interface TypeOfEntity {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-entityinfo-submit',
  templateUrl: './entityinfo-submit.component.html',
  styleUrls: ['./entityinfo-submit.component.sass']
})
export class EntityinfoSubmitComponent implements OnInit {
  basicInfoForm: FormGroup;
  orders: Order[];
  errors: string;
  uploadInput: EventEmitter<UploadInput>;
  type: string;
  orderId: number;
  nameOfEntity = [];
  orderInfo: any[][] = [];
  ifshow = false;
  chooseName: string;


  typeOfEntity: TypeOfEntity[] = [
    { value: 'clg', viewValue: '新加坡基金会' },
    { value: 'plc_singapore', viewValue: '新加坡私人有限公司' },
    { value: 'plc_bvi', viewValue: 'BVI私人有限公司' },
    // { value: 'plc_seychelles', viewValue: '塞舌尔有限公司' },
    // { value: 'plc_hongkong', viewValue: '香港有限公司' },
    // { value: 'plc_cayman', viewValue: '开曼有限公司' },
    // { value: 'plc_samoa', viewValue: '萨摩亚有限公司' },
  ];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.basicInfoForm = new FormGroup({
      name: new FormControl(),
    });
  }

  ngOnInit() {
    return this.orderService.getOrders()
      .subscribe( (orders) => {
        this.orders = orders;
        // 实现数组去重
        for (const order of this.orders) {
          this.orderInfo.push([order.incorporationName, order.is_satori, order.entity_type]);
        }
        for (let i = 0; i < this.orderInfo.length; i++) {
          if (this.nameOfEntity.indexOf(this.orderInfo[i][0]) === -1 && this.orderInfo[i][0] !== null) {
            this.nameOfEntity.push(this.orderInfo[i][0]);
            console.log(this.orderInfo[i][0]);
          }
        }
        this.nameOfEntity.push('非Setting It Unicorn注册公司');
      });
  }

  onNameOfEntityChanged(change: MatSelectChange) {
    if (change.value === '非Setting It Unicorn注册公司') {
      this.ifshow = true;
    } else {
      this.ifshow = false;
      this.chooseName = change.value;
    }
  }

  // 目前系统里包括clg和plc两种实体类型
  onSubmit() {
    const entity = new Entity();
    entity.name = this.chooseName;
    for (let i = 0; i < this.orderInfo.length; i++) {
      if (this.chooseName === this.orderInfo[i][0]) {
        entity.is_satori = this.orderInfo[i][1];
        entity.entityType = this.orderInfo[i][2];
      }
    }
    this.orderService
      .createEntity(entity)
      .subscribe((e) => {
        this.orderService
          .createOrder(new Order(), entity.entityType, e.id)
          .subscribe((o) => {
            // entity.id = o.entity_id;
            // entity.entityType = e.entityType;
            this.orderService
              .createOrder(new Order(), 'legal_arch', e.id)
              .subscribe((legal_order) => {
                console.log(legal_order);
                // this.orderId = o.id;
                this.router.navigate(['/order/legal_arch/', legal_order.id, 'introduction']);
                // this.orderService
                //   .updateEntity(entity)
                //   .subscribe(
                //     data => {
                //       this.router.navigate(['/order/legal_arch/', o.id, 'introduction']);
                //     },
                //     error => {
                //       this.basicInfoForm.setErrors({ error });
                //     }
                //   );
              });
          });
      });
  }

  onTypeOfEntityChanged(change: MatSelectChange) {
    this.type = change.value;
  }

  onConfirm() {
    const rawOrder = this.basicInfoForm.value;
    const entity = new Entity();
    [
      'name'
    ].forEach((key) => {
      entity[key] = rawOrder[key];
    });
    entity.entityType = this.type;
    // console.log(entity.entityType);
    // console.log(entity.name);
    entity.is_satori = false;
    this.orderService
      .createEntity(entity)
      .subscribe((e) => {
        this.orderService
          .createOrder(new Order(), entity.entityType, e.id)
          .subscribe((o) => {
             entity.id = o.entity_id;
             entity.entityType = e.entityType;
             this.orderService
               .createOrder(new Order(), 'legal_arch', e.id)
               .subscribe((o) => {
                 console.log(o);
                 this.orderId = o.id;
                 this.orderService
                   .updateEntity(entity)
                   .subscribe(
                     data => {
                       this.router.navigate(['/order/legal_arch/', o.id, 'introduction']);
                     },
                     error => {
                       this.basicInfoForm.setErrors({ error });
                     }
                   );
               });
          });
      });
  }
}
