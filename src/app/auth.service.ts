import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EventEmitter, Injectable, Output } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BaseService } from './base.service';

@Injectable()
export class AuthService extends BaseService {

  @Output()
  sessionStateChanged$ = new EventEmitter();

  signUp(email: string, password: string, invitation_code: string): Observable<any> {
    const url = '/signup';
    return this.http
      .post(
        this.baseUrl + url, {
          email,
          password,
          invitation_code
      })
      .do(data => {
        this.storeEmail(data['email']);
        this.storeJwtToken(data['access_token']);
        this.sessionStateChanged$.emit('signedIn');
      });
  }

  logIn(email: string, password: string): Observable<any> {
    const url = '/login';
    return this.http
      .post(
        this.baseUrl + url, {
          email,
          password
      })
      .do(data => {
        this.storeEmail(data['email']);
        this.storeJwtToken(data['access_token']);
        this.sessionStateChanged$.emit('loggedIn');
      });
  }

  logOut() {
    const url = '/logout';
    return this.http
      .delete(
        this.baseUrl + url, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }
        })
      .subscribe(() => {
        ['email', 'access_token'].forEach(key => {
          localStorage.removeItem(key);
        });
        this.sessionStateChanged$.emit('loggedOut');
      });
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  private storeJwtToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
  }

  private storeEmail(email: string) {
    localStorage.setItem('email', email);
  }

}
