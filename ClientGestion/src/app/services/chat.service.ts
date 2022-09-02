//V2///////////////////////////////////
// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import { WebsocketService } from './websocket.service';
// import { HttpClient } from '@angular/common/http';
// import * as Rx from 'rxjs/Rx';
//const CHAT_URL = 'ws://echo.websocket.org/';
// export interface Message {
//   author: string,
//   message: string
// }
//@Injectable()
/////////////////////////////////////////////////////
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chats=[] as any;
  constructor(private socket:WebsocketService) { 
    this.onReceiveMessage();
  }

  sendMessage(messageInfo){
    //Ingresamos nuestro mensaje al arreglo
    this.chats.push(messageInfo);
    //Emitimos nuestro evento sendMessage mandando el messageInfo
    this.socket.io.emit("sendMessage", messageInfo);
    //alert("FIN");
  }

  onReceiveMessage(){
    //escuchamos cuando recibo un msj/evento
    //alert("Entrando a funcion onReceiveMessage");
    //creamos evento reveiceMessage
    this.socket.io.on("reveiceMessage",(messageInfo)=>{
      messageInfo.type = 2;
      // console.log(messageInfo.text);
      // console.log(messageInfo.type);
      this.chats.push(messageInfo);
      alert("nuevo msj");
    });
  }

    ////////////////////////////////V2//////////////////////////////////////////////////////////////////
    // private _refresh$ = new Subject<void>();
    // constructor(private http: HttpClient) { }

    // get refresh$(){
    //   return this._refresh$;
    // }
    ////////////////////////////////////V2///////////////////////////////////////////////////////////

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