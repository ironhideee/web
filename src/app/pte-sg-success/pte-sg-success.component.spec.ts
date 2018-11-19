import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteSgSuccessComponent } from './pte-sg-success.component';

describe('PteSgSuccessComponent', () => {
  let component: PteSgSuccessComponent;
  let fixture: ComponentFixture<PteSgSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteSgSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteSgSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
