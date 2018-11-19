import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const authService = jasmine.createSpyObj('authService', ['logIn']);
  authService.logIn.and.returnValue(of());
  authService.sessionStateChanged$ = of(true);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
