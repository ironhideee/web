import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteSgStatusComponent } from './pte-sg-status.component';

describe('PteSgStatusComponent', () => {
  let component: PteSgStatusComponent;
  let fixture: ComponentFixture<PteSgStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteSgStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteSgStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
