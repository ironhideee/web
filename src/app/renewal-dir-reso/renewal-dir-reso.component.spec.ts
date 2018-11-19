import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalDirResoComponent } from './renewal-dir-reso.component';

describe('RenewalDirResoComponent', () => {
  let component: RenewalDirResoComponent;
  let fixture: ComponentFixture<RenewalDirResoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalDirResoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalDirResoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
