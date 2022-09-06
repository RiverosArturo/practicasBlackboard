import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Chat } from 'src/app/models/chat';
import { DatosService } from 'src/app/services/datos.service';
import { WebsocketService } from 'src/app/services/websocket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers: [ WebsocketService ]
})
export class ChatPage implements OnInit{

  user:number;
  nrc:number;
  nTrabajador:number;
  messengers:any=[];
  alumnos:any=[];
  profesores:any=[];
  chat:Chat = {
    mensaje: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: null,
    matricula: null,
    nombre: ''
  }

  constructor( private webSocketService: WebsocketService, private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user; 
    this.nrc = params.nrc;  
    this.nTrabajador = params.nTrabajador;
    this.chat = {
      mensaje: '',
      noTrabajador: this.nTrabajador,
      nrc: this.nrc,
      id_equipo: null,
      matricula: this.user,
      nombre:''
    }
    this.obtenerMensajesCurso();
  }

  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

  obtenerMensajesCurso(){
    this.datosService.obtenerMsjsCurso(this.nrc,this.nTrabajador).subscribe(
      res => {
        this.messengers = res;
        if(this.messengers.length > 0){
          this.webSocketService.chats = this.messengers;
        }else{
          console.log("No hay mensajes para mostrar!!!");
        }
      },
      err => console.error(err)
    );
  }

  sendMessage(){
    //obtenemos el nombre del usuario
    if(this.chat.matricula != null || this.chat.matricula > 0){
      this.datosService.getStudent(this.chat.matricula).subscribe(
        res => {
          this.alumnos[this.chat.matricula] = res;
          this.chat.nombre = this.alumnos[this.chat.matricula].nombre;
          //Insertamos el mensaje a nuestra BD
          this.datosService.saveChat(this.chat).subscribe(
            res => {
              console.log(res);
            },
            err => console.error(err)
          )
          //console.log(this.chat)
          //creamos nuestra variable para interactuar con los sockets
          let messageInfo = {
            id_equipo: this.chat.id_equipo,
            matricula: this.chat.matricula,
            mensaje: this.chat.mensaje,
            noTrabajador: this.chat.noTrabajador,
            nrc: this.chat.nrc,
            type: 1,
            nombre: this.chat.nombre
          }

          console.log(messageInfo);
          
          //Insertamos nuestra variable a la data de los sockets
          this.webSocketService.sendMessage(messageInfo);
          this.chat.mensaje = '';
        },
        err => console.error(err)
      );
    }
  }

}
