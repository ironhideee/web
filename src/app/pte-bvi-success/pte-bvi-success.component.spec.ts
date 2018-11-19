import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteBviSuccessComponent } from './pte-bvi-success.component';

describe('PteBviSuccessComponent', () => {
  let component: PteBviSuccessComponent;
  let fixture: ComponentFixture<PteBviSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteBviSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteBviSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
