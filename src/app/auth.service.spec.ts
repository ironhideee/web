import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  const spyHttpClient = jasmine.createSpyObj('HttpClient', ['post']);
  const stubResponse = of({
    email: 'stub@satori.works',
    access_token: 'at-12345',
  });
  spyHttpClient.post.and.returnValue(stubResponse);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: spyHttpClient }
      ],
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
