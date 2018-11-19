import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteBviStatusComponent } from './pte-bvi-status.component';

describe('PteBviStatusComponent', () => {
  let component: PteBviStatusComponent;
  let fixture: ComponentFixture<PteBviStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteBviStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteBviStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
