import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { ApiConfig } from '../../api.config';
import { Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { WebsocketService } from '../shared';
import { Message } from './message';

@Injectable()
export class MessageService {

  public constructor(
    public authHttp: AuthHttp,
    public wsService: WebsocketService
  ) {
  }

  public getRecent(page = 0): Observable<any> {
    const params = new URLSearchParams();
    params.set('page', '' + page);

    return this.authHttp.get(
      ApiConfig.url + '/api/message',
      { search: params }
    );
  }

  public post(message: string, mentions: any[]): Observable<any> {
    return this.authHttp.post(
      ApiConfig.url + '/api/message',
      JSON.stringify({
        text: message,
        mentions: mentions
      }), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public update(message: Message): Observable<any> {
    return this.authHttp.put(
      ApiConfig.url + '/api/message/' + message._id,
      JSON.stringify({ text: message.text }), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public delete(message: Message): Observable<any> {
    return this.authHttp.delete(
      ApiConfig.url + '/api/message/' + message._id, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public synchronize(timeFrameStart: Date, timeFrameEnd: Date): Observable<any> {
    return this.authHttp.post(
      ApiConfig.url + '/api/message/synchronize',
      JSON.stringify({ timeFrameStart, timeFrameEnd }), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public autocomplete(query: string): Observable<any> {
    return this.authHttp.post(
      ApiConfig.url + '/api/message/autocomplete',
      JSON.stringify({ query: query }), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Initializes Socket.io client with Jwt and listens to 'message'.
   */
  public getNewMessageSocket(): Observable<any> {
    const websocket = this.wsService.getSocket();
    return Observable.create(obs => {
      websocket.on('message', res => obs.next(res));
    });
  }

  public getUpdateSocket(): Observable<any> {
    const websocket = this.wsService.getSocket();
    return Observable.create(obs => {
      websocket.on('message-update', res => obs.next(res));
    });
  }
}
