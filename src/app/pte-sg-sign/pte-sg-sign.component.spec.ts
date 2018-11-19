import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteSgSignComponent } from './pte-sg-sign.component';

describe('PteSgSignComponent', () => {
  let component: PteSgSignComponent;
  let fixture: ComponentFixture<PteSgSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteSgSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteSgSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
