import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteBviSignComponent } from './pte-bvi-sign.component';

describe('PteBviSignComponent', () => {
  let component: PteBviSignComponent;
  let fixture: ComponentFixture<PteBviSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteBviSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteBviSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
