import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityinfoSubmitComponent } from './entityinfo-submit.component';

describe('EntityinfoSubmitComponent', () => {
  let component: EntityinfoSubmitComponent;
  let fixture: ComponentFixture<EntityinfoSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityinfoSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityinfoSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
