import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import * as Rx from 'rxjs/Rx';

 
const CHAT_URL = 'ws://echo.websocket.org/';
 
export interface Message {
    author: string,
    message: string
}
 
@Injectable()
export class ChatService {

    private _refresh$ = new Subject<void>();
    constructor(private http: HttpClient) { }

    get refresh$(){
      return this._refresh$;
    }

    // public messages: Subject<Message>;
 
    // constructor(wsService: WebsocketService) {
    //   this.messages = <Subject<Message>>wsService
    //   .connect(CHAT_URL)
    //   .map((response: MessageEvent): Message => {
    //       let data = JSON.parse(response.data);
    //       return {
    //           author: data.author,
    //           message: data.message
    //       }
    //   });
    // }
}