import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualEntityinfoComponent } from './annual-entityinfo.component';

describe('AnnualEntityinfoComponent', () => {
  let component: AnnualEntityinfoComponent;
  let fixture: ComponentFixture<AnnualEntityinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualEntityinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualEntityinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
