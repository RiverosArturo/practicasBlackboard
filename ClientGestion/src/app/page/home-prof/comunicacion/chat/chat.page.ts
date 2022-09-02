import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Chat } from 'src/app/models/chat';
import { DatosService } from 'src/app/services/datos.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers: [ WebsocketService, ChatService]
})
export class ChatPage implements OnInit {

  menu: any;
  subscription:Subscription;
  user:number;
  nrc:number;
  alert:string;
  messengers:any=[];
  alumnos:any=[];
  profesores:any=[];
  date:Date;
  output:string;
  chat:Chat = {
    mensaje: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: null,
    matricula: null
  }
  text='';

  constructor( private chatService: ChatService, private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { 
    // chatService.messages.subscribe(msg => {         
    //   console.log("Response from websocket: " + msg);
    // });
  }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf');
  }
  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.user,this.nrc]);
  }

  sendMessage(){
    let messageInfo = {
      text: this.text,
      type: 1
    } 
    this.chatService.sendMessage(messageInfo);
    this.text = '';
  }

  // private message = {
  //   author: 'tutorialedge',
  //   message: 'this is a test message'
  // }

  // sendMsg() {
  //     console.log('new message from client to websocket: ', this.message);
  //     this.chatService.messages.next(this.message);
  //     this.message.message = '';
  // }

  ngOnInit() {
    // const params = this.activedRoute.snapshot.params;  
    // this.user = params.user; 
    // this.nrc = params.nrc;  
    // this.chat = {
    //   mensaje: '',
    //   noTrabajador: this.user,
    //   nrc: this.nrc,
    //   id_equipo: null,
    //   matricula: null
    // }
    // this.subscription = this.datosService.refresh$.subscribe(()=>{
    //   this.obtenerMensajesCurso();
    // })
    // this.obtenerMensajesCurso();
    // this.date = new Date();
    // this.output = String(this.date.getDate()).padStart(2, '0') + '/' + String(this.date.getMonth() + 1).padStart(2, '0') + '/' + this.date.getFullYear();
    // console.log(this.output); 
  }

  // obtenerMensajesCurso(){
  //   this.datosService.obtenerMsjsCurso(this.nrc,this.user).subscribe(
  //     res => {
  //       this.messengers = res; 
  //       if(this.messengers.length > 0){
  //         console.log("si hay mensajes para mostrar!!!");
  //         for(let i = 0; i<=this.messengers.length;i++){
            
  //           if(this.messengers[i].matricula != null){
              
  //             this.datosService.getStudent(this.messengers[i].matricula).subscribe(
  //               res => {
  //                 this.alumnos[this.messengers[i].matricula] = res; 
  //               },
  //               err => console.error(err)
  //             );
  //           }else if(this.messengers[i].noTrabajador != null){
              
  //             this.datosService.getProf(this.messengers[i].noTrabajador).subscribe(
  //               res => {
  //                 this.profesores[this.messengers[i].noTrabajador] = res; 
  //               },
  //               err => console.error(err)
  //             );
  //           }
  //         }
  //       }else{
  //         this.alert = 'Aun nadie ha enviado mensajes para mostrar!!!';
  //       }

  //     },
  //     err => console.error(err)
  //   );
  // }
  // enviarMensaje(){
  //   ///// query que inserta msj en la bd/////////////
  //   console.log(this.chat);
  //   this.datosService.saveChat(this.chat).subscribe(
  //     res => {
  //       console.log(res);
        
  //       // this.datosService.obtenerMsjsCurso(this.nrc,this.user).subscribe(
  //       //   res => {
  //       //     this.messengers = res; 
  //       //   },
  //       //   err => console.error(err)
  //       // );
  //     },
  //     err => console.error(err)
  //   )
  //   this.obtenerMensajesCurso();
  //   this.chat.mensaje = '';
  //   console.log(this.chat)

  // }

}
