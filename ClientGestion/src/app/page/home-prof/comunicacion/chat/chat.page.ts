import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Chat } from 'src/app/models/chat';
import { DatosService } from 'src/app/services/datos.service';
import { WebsocketService } from 'src/app/services/websocket.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers: [ WebsocketService ]
})
export class ChatPage implements OnInit {

  menu: any;
  course:any=[];
  curso:string='';
  user:number;
  nrc:number;
  messengers:any=[];
  messengersEquipo:any=[];
  equipos:any=[];
  alumnos:any=[];
  profesores:any=[];
  chat:Chat = {
    mensaje: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: null,
    matricula: null,
    nombre: '',
    sala: ''
  }
  chatE:Chat = {
    mensaje: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: null,
    matricula: null,
    nombre: '',
    sala: ''
  }

  //botones curso
  boton:number = 0;
  //botones equipo
  boton2:number = 0;

  //Para hacer conexion en el ngOnInit()
  // this.webSocketService.listen("test event").subscribe((data)=>{
  //   console.log(data);
  // });

  constructor( private webSocketService: WebsocketService, private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { 
  }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf');
  }
  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.user,this.nrc]);
    this.boton = 0;
    this.boton2 = 0;
    this.webSocketService.chatsEquipo = [];
    this.webSocketService.chats = [];
    let sala = this.chat.sala;
    this.webSocketService.desconectarSala(sala);
    sala = this.chatE.sala;
    this.webSocketService.desconectarSala(sala);
  }


  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user; 
    this.nrc = params.nrc;  
    this.obtenerCurso();
    this.chat = {
      mensaje: '',
      noTrabajador: this.user,
      nrc: this.nrc,
      id_equipo: null,
      matricula: null,
      nombre:'',
      sala: ''
    }
    this.obtenerMensajesCurso();

    this.chatE = {
      mensaje: '',
      noTrabajador: this.user,
      nrc: this.nrc,
      id_equipo: null,
      matricula: null,
      nombre:'',
      sala: ''
    }
    this.getEquipos1(this.chatE.nrc,this.chatE.noTrabajador);
    this.obtenerMensajesCursoEquipo(this.chatE.id_equipo);
  }

  atras2(){
    this.boton = 0;
    this.boton2 = 0;
    this.webSocketService.chatsEquipo = [];
    this.webSocketService.chats = [];
    let sala = this.chat.sala;
    this.webSocketService.desconectarSala(sala);
    sala = this.chatE.sala;
    this.webSocketService.desconectarSala(sala);
  }
  chatCurso(){
    let sala= this.chat.sala;
    this.webSocketService.unirSala(sala);
    this.boton=2;
    this.boton2=1;
  }

  obtenerCurso(){
    this.datosService.getCourse(this.nrc)
      .subscribe(
        res =>{       
          this.course = res;               
          this.curso = this.course.materia;     
          this.chat.sala = this.course.materia;
        },
        err => console.error(err)
      )
  }

  getEquipos1(nrc:number, nTrabajador:number){    
    this.datosService.getEquipos1(nrc, nTrabajador).subscribe(
      res => {
        this.equipos = res;
      },
      err => console.error(err)
    );
  }

  obtenerMensajesCurso(){
    this.datosService.obtenerMsjsCurso(this.nrc,this.user).subscribe(
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

  obtenerMensajesCursoEquipo(id_equipo:number, nombre?:string){
    this.chatE.id_equipo = id_equipo;
    this.chatE.sala = nombre;
    let sala = nombre;
    this.webSocketService.unirSala(sala);
    //console.log(this.chatE);
    console.log("HOLAAAAAAAAAA: " + this.chatE.sala);
    this.boton2 = 2;
    this.boton = 1
    this.datosService.obtenerMsjsCursoEquipo(this.nrc,id_equipo,this.user).subscribe(
      res => {
        this.messengersEquipo = res;
        if(this.messengersEquipo.length > 0){
          this.webSocketService.chatsEquipo = this.messengersEquipo;
        }else{
          console.log("No hay mensajes para mostrar!!!");
        }
      },
      err => console.error(err)
    );
  }


  sendMessage(){
    this.datosService.getProf(this.chat.noTrabajador).subscribe(
      res => {
        this.profesores[this.chat.noTrabajador] = res; 
        this.chat.nombre = this.profesores[this.chat.noTrabajador].nombre;
        //Insertamos el mensaje a nuestra BD
        console.log("Soy salaaaa: " + this.chat.sala);
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
          nombre: this.chat.nombre,
          sala: this.chat.sala
        }

        console.log(messageInfo);
        
        //Insertamos nuestra variable a la data de los sockets
        this.webSocketService.sendMessage(messageInfo);
        this.chat.mensaje = '';
      },
      err => console.error(err)
    );
  }

  sendMessageEquipo(){
    this.datosService.getProf(this.chatE.noTrabajador).subscribe(
      res => {
        this.profesores[this.chatE.noTrabajador] = res; 
        this.chatE.nombre = this.profesores[this.chatE.noTrabajador].nombre;
        //Insertamos el mensaje a nuestra BD
        this.datosService.saveChat(this.chatE).subscribe(
          res => {
            console.log(res);
          },
          err => console.error(err)
        )
        //console.log(this.chat)
        //creamos nuestra variable para interactuar con los sockets
        console.log("ChatE: " + this.chatE.id_equipo);
        let messageInfo = {
          id_equipo: this.chatE.id_equipo,
          matricula: this.chatE.matricula,
          mensaje: this.chatE.mensaje,
          noTrabajador: this.chatE.noTrabajador,
          nrc: this.chatE.nrc,
          type: 1,
          nombre: this.chatE.nombre,
          sala: this.chatE.sala
        }

        console.log("messgeI: " + messageInfo.id_equipo);
        
        //Insertamos nuestra variable a la data de los sockets
        this.webSocketService.sendMessageEquipo(messageInfo);
        this.chatE.mensaje = '';
      },
      err => console.error(err)
    );
  }

}
