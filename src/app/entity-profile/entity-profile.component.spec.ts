import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityProfileComponent } from './entity-profile.component';

describe('EntityProfileComponent', () => {
  let component: EntityProfileComponent;
  let fixture: ComponentFixture<EntityProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
