import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable()
export class WebsocketService {

  // io = io("http://localhost:5000/", {
  //   withCredentials: true,
  //   autoConnect: true,
  // });

  chats=[] as any;
  chatsEquipo=[] as any;
  socket:any;
  readonly url: string = "ws://localhost:3000/"
  constructor() {
    this.socket = io(this.url);
    this.onReceiveMessage();
    this.onReceiveMessageEquipo();
  }

  //Metodo escucha el socket
  // listen(eventName:string){
  //   return new Observable((subscriber)=>{
  //     this.socket.on(eventName,(data)=>{
  //       subscriber.next(data);
  //     })
  //   })
  // }

  // emit(eventName, data){
  //   this.socket.emit(eventName, data);
  // }

  sendMessage(messageInfo){
    //Ingresamos nuestro mensaje al arreglo
    this.chats.push(messageInfo);
    //Emitimos nuestro evento sendMessage mandando el messageInfo
    this.socket.emit("sendMessage", messageInfo);
    //alert("FIN");
  }

  sendMessageEquipo(messageInfo){
    this.chatsEquipo.push(messageInfo);
    this.socket.emit("sendMessage", messageInfo);
  }


  onReceiveMessage(){
    //escuchamos cuando recibo un msj/evento
    //alert("Entrando a funcion onReceiveMessage");
    //creamos evento reveiceMessage
    this.socket.on("reveiceMessage",(messageInfo)=>{
      messageInfo.type = 2;
      // console.log(messageInfo.text);
      // console.log(messageInfo.type);
      this.chats.push(messageInfo);
      //alert("nuevo msj");
    });
  }

  onReceiveMessageEquipo(){
    this.socket.on("reveiceMessage",(messageInfo)=>{
      messageInfo.type = 2;
      this.chatsEquipo.push(messageInfo);
    });
  }

}
