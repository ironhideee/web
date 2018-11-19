import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileComponent } from './input-file.component';
import { FormsModule, NgControl } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NgContentAst } from '@angular/compiler';
import { of } from 'rxjs/observable/of';

describe('InputFileComponent', () => {
  let component: InputFileComponent;
  let fixture: ComponentFixture<InputFileComponent>;

  const fm = jasmine.createSpyObj('fm', ['monitor']);
  fm.monitor.and.returnValue(of(true));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFileComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: FocusMonitor, useValue: fm },
        NgControl
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
