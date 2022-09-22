import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';


@Injectable()
export class WebsocketService {

  chats=[] as any;
  chatsEquipo=[] as any;
  socket:any;
  readonly url: string = "ws://localhost:3000/"
  
  constructor() {
    this.socket = io(this.url);
    this.onReceiveMessage();
    this.onReceiveMessageEquipo();
  }
  unirSala(sala:string){
    this.socket.emit("unirSala", sala);
  }

  desconectarSala(sala:string){
    this.socket.emit("desconectarSala", sala);
  }
  sendMessage(messageInfo){
    //Ingresamos nuestro mensaje al arreglo
    this.chats.push(messageInfo);
    //Emitimos nuestro evento sendMessage mandando el messageInfo
    this.socket.emit("sendMessage", messageInfo);
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
      // console.log(messageInfo.text);
      // console.log(messageInfo.type);
        this.chats.push(messageInfo);
      //alert("nuevo msj");
    });
  }
  onReceiveMessageEquipo(){
    this.socket.on("reveiceMessage",(messageInfo)=>{
        this.chatsEquipo.push(messageInfo);
    });
  }

}
