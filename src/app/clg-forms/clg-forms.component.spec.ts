import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClgFormsComponent } from './clg-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatSelectModule, MatChipsModule,
  MatIconModule, MatDatepickerModule, MatCheckboxModule, MatNativeDateModule, MatInputModule
} from '@angular/material';
import { of } from 'rxjs/observable/of';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ClgFormsComponent', () => {
  let component: ClgFormsComponent;
  let fixture: ComponentFixture<ClgFormsComponent>;

  const orderService = jasmine.createSpyObj('orderService', ['createOrder']);
  orderService.createOrder.and.returnValue(of());
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClgFormsComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: OrderService, useValue: orderService },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClgFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
