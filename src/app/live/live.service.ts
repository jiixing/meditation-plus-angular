import { Injectable } from '@angular/core';
import { AuthHttp } from '../shared/auth-http.service';
import { ApiConfig } from '../../api.config';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LiveService {

  public constructor(public authHttp: AuthHttp) {
  }

  public getLiveData() {
    return this.authHttp.get(
      ApiConfig.url + '/api/live'
    );
  }
}
