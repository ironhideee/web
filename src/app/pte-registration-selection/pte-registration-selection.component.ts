import {Component, EventEmitter, OnInit} from '@angular/core';
import {TypeOfEntity} from '../annual-entityinfo/annual-entityinfo.component';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Order} from '../order';
import {Entity} from '../entity';
import { ActivatedRoute } from '@angular/router';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-pte-registration-selection',
  templateUrl: './pte-registration-selection.component.html',
  styleUrls: ['./pte-registration-selection.component.sass']
})
export class PteRegistrationSelectionComponent implements OnInit {
  orders: Order[];
  errors: string;
  type: string;
  registration: string;


  typeOfEntity: TypeOfEntity[] = [
    { value: 'plc_singapore', viewValue: '新加坡私人有限公司' },
    { value: 'plc_bvi', viewValue: '英属维京群岛私人有限公司' },
    // { value: 'plc_seychelles', viewValue: '塞舌尔私人有限公司' },
    // { value: 'plc_hongkong', viewValue: '香港私人有限公司' },
    // { value: 'plc_cayman', viewValue: '开曼私人有限公司' },
    // { value: 'plc_samoa', viewValue: '萨摩亚私人有限公司' },
  ];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  onNameOfEntityChanged(change: MatSelectChange) {
    this.registration = change.value;
  }

  onSubmit() {
    const entity = new Entity();
    entity.entityType = this.registration;
    entity.is_satori = true;
    this.orderService
      .createEntity(entity)
      .subscribe((e) => {
        this.orderService
          .createOrder(new Order(), entity.entityType, e.id)
          .subscribe((o) => {
            this.router.navigate(['/order/', entity.entityType, o.id, 'introduction']);
          });
      });
  }

}
