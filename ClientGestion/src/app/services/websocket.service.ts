import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
// import { HttpClient } from '@angular/common/http';
// import {Subject, Observer, Observable} from 'rxjs';
// import * as Rx from 'rxjs/Rx';
// import { Chat } from '../models/chat';


@Injectable()
export class WebsocketService {

  io = io("http://localhost:3000/", {
    withCredentials: true,
    autoConnect: true
  });

  constructor() {
    
  }

  // webSocket: WebSocket; 
  // chatMessages: Chat[] = [];
  // constructor() { }

  // public openWebSocket(){
  //   this.webSocket = new WebSocket('ws://localhost:3000/api/chat', 'echo-protocol');

  //   this.webSocket.onopen = (event) => {
  //     console.log('Open: ', event);
  //   }

  //   this.webSocket.onmessage = (event) => {
  //     const chat = JSON.parse(event.data);
  //     this.chatMessages.push(chat);
  //   }

  //   this.webSocket.onclose = (event) => {
  //     console.log('Close: ', event);
  //   }
  // }

  // public sendMessage(chatMessage: Chat){
  //   this.webSocket.send(JSON.stringify(chatMessage));

  // }

  // public closeWebSocket(){
  //   this.webSocket.close();
  // }

  ////////////////////////////////////////////////////////////////

  // private subject: Rx.Subject<MessageEvent>;

  // public connect(url): Rx.Subject<MessageEvent> {
  //   if (!this.subject) {
  //     this.subject = this.create(url);
  //     console.log("Successfully connected: " + url);
  //   } 
  //   return this.subject;
  // }

  // private create(url): Rx.Subject<MessageEvent> {
  //   //let url = 'ws://localhost:3000/api';
  //   let ws = new WebSocket(url);

  //   let observable = Rx.Observable.create(
  //     (obs: Rx.Observer<MessageEvent>) => {
  //         ws.onmessage = obs.next.bind(obs);
  //         ws.onerror = obs.error.bind(obs);
  //         ws.onclose = obs.complete.bind(obs);
  //         return ws.close.bind(ws);
  //   })
  //   let observer = {
  //     next: (data: Object) => {
  //         if (ws.readyState === WebSocket.OPEN) {
  //             ws.send(JSON.stringify(data));
  //         }
  //     }
  //   }
  //   return Rx.Subject.create(observer, observable);
  // }

}
