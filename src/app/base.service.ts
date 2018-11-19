import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseService {

  protected baseUrl = environment.apiBaseUrl;
  protected outerBaseUrl = environment.outerBaseUrl;
  protected hostBaseUrl = environment.hostBaseUrl;

  constructor(protected http: HttpClient) { }

}
